import { RequestHandler, Router } from "express";

import { XAccessToken } from "@/middlewares";

export class PublicAPI extends XAccessToken {
  constructor(controller: any, router: Router) {
    super();
    this.controllerInstance = controller;
    this.router = router;
  }

  private controllerInstance: any;
  private router: Router;

  private bindController(controller: RequestHandler) {
    return controller.bind(this.controllerInstance);
  }

  public get(
    url: string,
    controller: RequestHandler,
    xAccessTokenRequired: boolean = true
  ) {
    if (xAccessTokenRequired) {
      this.router.get(
        url,
        this.xAccessTokenCheck,
        this.bindController(controller)
      );
    } else {
      this.router.get(url, this.bindController(controller));
    }
  }

  public post(
    url: string,
    controller: RequestHandler,
    xAccessTokenRequired: boolean = true
  ) {
    if (xAccessTokenRequired) {
      this.router.post(
        url,
        this.xAccessTokenCheck,
        this.bindController(controller)
      );
    } else {
      this.router.post(url, this.bindController(controller));
    }
  }

  public put(
    url: string,
    controller: RequestHandler,
    xAccessTokenRequired: boolean = true
  ) {
    if (xAccessTokenRequired) {
      this.router.put(
        url,
        this.xAccessTokenCheck,
        this.bindController(controller)
      );
    } else {
      this.router.put(url, this.bindController(controller));
    }
  }

  public delete(
    url: string,
    controller: RequestHandler,
    xAccessTokenRequired: boolean = true
  ) {
    if (xAccessTokenRequired) {
      this.router.delete(
        url,
        this.xAccessTokenCheck,
        this.bindController(controller)
      );
    } else {
      this.router.delete(url, this.bindController(controller));
    }
  }
}
