import {HttpError} from "http-errors";
export const errorHandler = (error, req, res, next)=> {
  if(error instanceof HttpError) {
    const {status = 500} = error;
    return res.status(status).json({
      message: error.message || error.name
    });
  }};
