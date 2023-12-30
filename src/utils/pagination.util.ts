import { Order } from "sequelize";

import { IResponsePagination } from "@/types";

export const requestPagination = (
  perPage: string,
  page: string,
  sortAsc: string,
  sortDesc: string
) => {
  let offset: number;
  let limit: number;
  let orderAsc: Order | undefined;
  let orderDesc: Order | undefined;

  if (perPage === undefined || perPage === "") {
    limit = 10;
  } else {
    limit = parseInt(perPage);
  }

  if (page === undefined || page === "") {
    offset = 0;
  } else {
    const pageInt = parseInt(page);
    if (pageInt > 0) {
      offset = (parseInt(page) - 1) * limit;
    } else {
      offset = 0;
    }
  }

  if (sortAsc === undefined || sortAsc === "") {
    orderAsc = [];
  } else {
    const sortList = sortAsc.split(",");
    orderAsc = sortList.map((item) => [item, "asc"]);
  }

  if (sortDesc === undefined || sortDesc === "") {
    orderDesc = [];
  } else {
    const sortList = sortDesc.split(",");
    orderDesc = sortList.map((item) => [item, "desc"]);
  }

  return {
    offset,
    limit,
    order:
      orderAsc.concat(orderDesc).length === 0
        ? undefined
        : orderAsc.concat(orderDesc),
  };
};

export const responsePagination = (
  count: number,
  perPage: number,
  page: string | undefined
): IResponsePagination => {
  const totalPages = Math.ceil(count / perPage);
  let currentPage: number;

  if (page === undefined || page === "") {
    currentPage = 0;
  } else {
    currentPage = parseInt(page);
  }

  const previousPage = currentPage <= 1 ? null : currentPage - 1;
  const nextPage = currentPage >= totalPages ? null : currentPage + 1;

  return {
    totalItems: count,
    totalPages,
    perPage,
    currentPage,
    nextPage,
    previousPage,
  };
};
