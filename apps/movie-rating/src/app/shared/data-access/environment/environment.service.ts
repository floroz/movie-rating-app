import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import type { Environment } from '../../../../environments/environment.types';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private _environment: Environment = environment;

  get env(): Environment {
    return this._environment;
  }

  set env(_: unknown) {
    throw new Error(
      "It's forbidden to manually mutate the values of environment config."
    );
  }
}
