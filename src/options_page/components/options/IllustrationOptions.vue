<template>
  <div class="option-section">
    <span class="option-card-title">{{ tl('Illustration') }}</span>

    <v-card style="margin-bottom:30px;">
      <v-list two-line>
        <v-list-tile @click="showRenameDialog()">
          <v-list-tile-content>
            <v-list-tile-title>{{ tl('Rename_illustration') }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ renameFormatPreview }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile @click="showRenameImageDialog()">
          <v-list-tile-content>
            <v-list-tile-title>{{ tl('Rename_illustration_image') }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ imageRenameFormatPreview }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ tl('Download_file_if_everything_is_ready') }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-switch v-model="downloadIfReady"></v-switch>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import SuperMixin from "@/mixins/SuperMixin";

export default {
  mixins: [
    SuperMixin
  ],

  data() {
    return {
      renameFormat: "",

      imageRenameFormat: "",

      downloadIfReady: false
    };
  },

  computed: {
    renameFormatPreview() {
      if (!!this.browserItems.illustrationRenameFormat) {
        return this.browserItems.illustrationRenameFormat;
      } else {
        return "Not set";
      }
    },

    imageRenameFormatPreview() {
      if (!!this.browserItems.illustrationImageRenameFormat) {
        return this.browserItems.illustrationImageRenameFormat;
      } else {
        return "Not set";
      }
    }
  },

  watch: {
    downloadIfReady(val) {
      browser.storage.local.set({
        illustrationDownloadIfReady: val
      });
    }
  },

  beforeMount() {
    this.downloadIfReady = this.browserItems.illustrationDownloadIfReady;
  },

  methods: {
    showRenameDialog(evt) {
      this.$router.push({
        name: "RenameIllustration"
      });
    },

    showRenameImageDialog(evt) {
      this.$router.push({
        name: "RenameIllustrationImage"
      });
    }
  }
};
</script>
