import { HttpError } from "@lib/error-handling/http-error";
import { AnyKeys, Document, FilterQuery, Model } from "mongoose";

export const CrudService = <ModelDoc extends Document>(
  model: Model<ModelDoc>,
  crudOptions?: {
    defaultFilter?: FilterQuery<ModelDoc>;
  }
) => {
  return class CrudServiceClass {
    public model: Model<ModelDoc> = model;

    async create(data: AnyKeys<ModelDoc>): Promise<ModelDoc> {
      return await this.model.create(data);
    }

    async updateOne(
      filter: FilterQuery<ModelDoc>,
      data: AnyKeys<ModelDoc>
    ): Promise<ModelDoc> {
      filter = { ...crudOptions?.defaultFilter, ...filter };

      await this.existsOrThrow(filter);

      await this.model.updateOne(filter, data);

      return (await this.findOneOrFail(filter)) as ModelDoc;
    }

    async updateMany(
      filter: FilterQuery<ModelDoc>,
      data: AnyKeys<ModelDoc>,
      checkExists: boolean = true
    ): Promise<ModelDoc[]> {
      filter = { ...crudOptions?.defaultFilter, ...filter };

      if (checkExists) {
        await this.existsOrThrow(filter);
      }

      await this.model.updateMany(filter, data);

      return (await this.model.find(filter)) as ModelDoc[];
    }

    async deleteOne(filter: FilterQuery<ModelDoc>): Promise<ModelDoc> {
      filter = { ...crudOptions?.defaultFilter, ...filter };

      await this.existsOrThrow(filter);

      const deleted = await this.model.findOneAndDelete(filter);

      if (!deleted) {
        throw new HttpError(404, "No Matching Result Found.");
      }

      return deleted as unknown as ModelDoc;
    }

    async softDelete(
      filter: FilterQuery<ModelDoc>
    ): Promise<ModelDoc> {
      filter = { ...crudOptions?.defaultFilter, ...filter };

      await this.existsOrThrow(filter);

      await this.model.updateOne(filter, { isDeleted: true } as any);

      return (await this.findOneOrFail(filter)) as ModelDoc;
    }

    async list(
      filter: FilterQuery<ModelDoc>,
      paginationOptions: {
        limit?: number;
        skip?: number;
      } = {
        limit: 10,
        skip: 0,
      },
      options?: {
        populateArray?: any;
        filterOptions?: any;
      }
    ): Promise<{
      docs: ModelDoc[];
      paginationData: {
        total: number;
        page: number;
        perPage: number;
      };
    }> {
      if (options?.filterOptions)
        filter = { ...filter, ...options.filterOptions };

      filter = { ...crudOptions?.defaultFilter, ...filter };

      const query = this.model
        .find(filter)
        .limit(paginationOptions.limit)
        .skip(paginationOptions.skip);

      if (options?.populateArray) {
        query.populate(options.populateArray);
      }

      const docs = (await query) as ModelDoc[];
      const total = await this.model.countDocuments(filter);

      return {
        docs,
        paginationData: {
          total,
          page: paginationOptions.skip ?? 0,
          perPage: paginationOptions.limit ?? 10,
        },
      };
    }

    async listAll(
      filter: FilterQuery<ModelDoc>,
      options?: {
        populateArray?: any;
      }
    ): Promise<ModelDoc[]> {
      filter = { ...crudOptions?.defaultFilter, ...filter };

      const query = this.model.find(filter);

      if (options?.populateArray) {
        query.populate(options.populateArray);
      }

      return (await query) as ModelDoc[];
    }

    async search(
      filter: FilterQuery<ModelDoc>,
      paginationOptions: {
        limit?: number;
        skip?: number;
      } = {
        limit: 10,
        skip: 0,
      },
      options?: {
        populateArray?: any;
      }
    ): Promise<{
      docs: ModelDoc[];
      paginationData: {
        total: number;
        page: number;
        perPage: number;
      };
    }> {
      filter = { ...crudOptions?.defaultFilter, ...filter };

      const query = this.model
        .find(filter)
        .limit(paginationOptions.limit)
        .skip(paginationOptions.skip);

      if (options?.populateArray) {
        query.populate(options.populateArray);
      }

      const docs = (await query) as ModelDoc[];
      const total = await this.model.countDocuments(filter);

      return {
        docs,
        paginationData: {
          total,
          page: paginationOptions.skip ?? 0,
          perPage: paginationOptions.limit ?? 10,
        },
      };
    }

    async findOne(
      filter: FilterQuery<ModelDoc>,
      options?: {
        populateArray?: any;
      }
    ): Promise<ModelDoc | null> {
      const query = this.model.findOne(filter);

      if (options?.populateArray) {
        query.populate(options.populateArray);
      }

      return await query;
    }

    async findOneOrFail(
      filter: FilterQuery<ModelDoc>,
      options?: {
        populateArray?: any;
        selectArray?: any;
      }
    ): Promise<ModelDoc> {
      const query = this.model.findOne(filter);

      if (options?.populateArray) {
        query.populate(options.populateArray);
      }

      if (options?.selectArray) {
        query.select(options.selectArray);
      }

      const document = await query;

      if (!document) {
        throw new HttpError(404, "No Matching Result Found.");
      }

      return document as ModelDoc;
    }

    private async existsOrThrow(filter: FilterQuery<ModelDoc>) {
      const exists = await this.model.exists(filter);

      if (!exists) {
        throw new HttpError(404, "No Matching Result Found.");
      }
    }
  };
};