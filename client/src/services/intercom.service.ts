import { intercomConfig } from '../config/intercom.config';

export class IntercomService {
  static updateUser(userData: any) {
    if (window.Intercom) {
      window.Intercom('update', userData);
    }
  }

  static trackEvent(eventName: string, metadata?: any) {
    if (window.Intercom) {
      window.Intercom('trackEvent', eventName, metadata);
    }
  }

  static showMessages() {
    if (window.Intercom) {
      window.Intercom('show');
    }
  }

  static hideMessages() {
    if (window.Intercom) {
      window.Intercom('hide');
    }
  }

  static boot(userData: any) {
    if (window.Intercom) {
      window.Intercom('boot', {
        app_id: intercomConfig.appId,
        ...userData,
      });
    }
  }

  static shutdown() {
    if (window.Intercom) {
      window.Intercom('shutdown');
    }
  }
}
