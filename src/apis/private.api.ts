import { RequestHandler, Router } from "express";

import { Authentication } from "@/middlewares";

export class PrivateAPI extends Authentication {
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
    isAdminOnly: boolean = false,
    xAccessTokenRequired: boolean = true
  ) {
    if (xAccessTokenRequired) {
      this.router.get(
        url,
        isAdminOnly ? (this.isAuthenticate, this.isAdmin) : this.isAuthenticate,
        this.xAccessTokenCheck,
        this.bindController(controller)
      );
    } else {
      this.router.get(
        url,
        isAdminOnly ? (this.isAuthenticate, this.isAdmin) : this.isAuthenticate,
        this.bindController(controller)
      );
    }
  }

  public post(
    url: string,
    controller: RequestHandler,
    isAdminOnly: boolean = false,
    xAccessTokenRequired: boolean = true
  ) {
    if (xAccessTokenRequired) {
      this.router.post(
        url,
        isAdminOnly ? (this.isAuthenticate, this.isAdmin) : this.isAuthenticate,
        this.xAccessTokenCheck,
        this.bindController(controller)
      );
    } else {
      this.router.post(
        url,
        isAdminOnly ? (this.isAuthenticate, this.isAdmin) : this.isAuthenticate,
        this.bindController(controller)
      );
    }
  }

  public put(
    url: string,
    controller: RequestHandler,
    isAdminOnly: boolean = false,
    xAccessTokenRequired: boolean = true
  ) {
    if (xAccessTokenRequired) {
      this.router.put(
        url,
        isAdminOnly ? (this.isAuthenticate, this.isAdmin) : this.isAuthenticate,
        this.xAccessTokenCheck,
        this.bindController(controller)
      );
    } else {
      this.router.put(
        url,
        isAdminOnly ? (this.isAuthenticate, this.isAdmin) : this.isAuthenticate,
        this.bindController(controller)
      );
    }
  }

  public delete(
    url: string,
    controller: RequestHandler,
    isAdminOnly: boolean = false,
    xAccessTokenRequired: boolean = true
  ) {
    if (xAccessTokenRequired) {
      this.router.delete(
        url,
        isAdminOnly ? (this.isAuthenticate, this.isAdmin) : this.isAuthenticate,
        this.xAccessTokenCheck,
        this.bindController(controller)
      );
    } else {
      this.router.delete(
        url,
        isAdminOnly ? (this.isAuthenticate, this.isAdmin) : this.isAuthenticate,
        this.bindController(controller)
      );
    }
  }
}
