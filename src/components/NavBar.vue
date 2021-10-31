<i18n>
{
  "en": {
    "home": "Home",
    "movies": "Movies",
    "bookmarks": "Bookmarks",
    "about": "About",
    "forward": "Go Forward",
    "back": "Go Back",
    "lang": "language"
  },
  "zh": {
    "home": "首页",
    "movies": "电影",
    "bookmarks": "书签",
    "about": "关于",
    "forward": "前进",
    "back": "后退",
    "lang": "语言"
  }
}
</i18n>

<template>
  <div>
    <v-toolbar color="#363e49" v-if="small">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="$router.push('/')">
        <img
          src="/img/logo.png"
          style="max-height: 5em"
          alt="live torrent logo"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.go(-1)">
        <i class="fas fa-chevron-left"></i>
      </v-btn>
      <v-btn icon @click="$router.go(1)">
        <i class="fas fa-chevron-right"></i>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      :value="small ? drawer : true"
      hide-overlay
      :floating="small"
      :temporary="small"
      :mini-variant="small ? false : mini"
      stateless
      app
      style="background: #414758"
      @update:mini-variant="drawer = !drawer"
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar @click.stop="mini = !mini">
            <v-list-tile-avatar>
              <img src="/img/logo.png" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Live Torrent</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="drawer = !drawer" v-if="small">
                <v-icon>close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          @click="drawer = !drawer"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="$router.go(-1)" v-if="!small">
          <v-list-tile-action>
            <i class="fas fa-chevron-left"></i>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t("back") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="$router.go(1)" v-if="!small">
          <v-list-tile-action>
            <i class="fas fa-chevron-right"></i>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t("forward") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <i class="fas fa-language"></i>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-select v-model="locale" :items="langs"></v-select>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: false,
      langs: [
        { text: "English", value: "en" },
        { text: "简体中文", value: "zh" }
      ]
    };
  },
  computed: {
    small() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    locale: {
      get() {
        return this.$i18n.locale.split("-")[0];
      },
      set(val) {
        localStorage.setItem("locale", val);
        this.$i18n.locale = val;
      }
    },
    items() {
      return [
        { title: this.$t("home"), icon: "fas fa-home", path: "/" },
        { title: this.$t("movies"), icon: "fas fa-film", path: "/movies" },
        {
          title: this.$t("bookmarks"),
          icon: "fas fa-bookmark",
          path: "/bookmarks"
        },
        { title: this.$t("about"), icon: "fas fa-info-circle", path: "/about" }
      ];
    }
  },
  watch: {
    mini: n => localStorage.setItem("sidemenu.mini", n ? "true" : "false")
  },
  created() {
    if (this.small) {
      this.drawer = false;
      this.mini = false;
    } else {
      this.mini =
        (localStorage.getItem("sidemenu.mini") || "true") === "true"
          ? true
          : false;
      this.drawer = true;
    }
  }
};
</script>

<style lang="scss">
.pt-0 {
  .fas {
    width: 30px;
    text-align: center;
  }
}
</style>
