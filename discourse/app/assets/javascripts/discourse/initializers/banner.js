import EmberObject from "@ember/object";
import PreloadStore from "preload-store";

export default {
  name: "banner",
  after: "message-bus",

  initialize(container) {
    const banner = EmberObject.create(PreloadStore.get("banner") || {}),
      site = container.lookup("site:main");

    site.set("banner", banner);

    const messageBus = container.lookup("message-bus:main");
    if (!messageBus) {
      return;
    }

    messageBus.subscribe("/site/banner", function(ban) {
      site.set("banner", EmberObject.create(ban || {}));
    });
  }
};
