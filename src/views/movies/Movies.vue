<i18n>
{
  "en":{
    "title":"Torrent Movies",
    "search_hint":"Looking for",
    "order":"Order",
    "ascending":"Ascending",
    "descending":"Descending",
    "genre":"Genre",
    "rating":"Minimum Rating",
    "search":"Search",
    "random":"Random",
    "pager_label":"Page Number",
    "no_result_hint":"No Results.",
    "Title":"Title",
    "Year":"Year",
    "Rating":"Rating",
    "Peers":"Peers",
    "Seeds":"Seeds",
    "Downloads":"Downloads",
    "Popularity":"Popularity",
    "Upload Date":"Upload Date",
    "All":"All",
    "Action":"Action",
    "Adventure":"Adventure",
    "Animation":"Animation",
    "Biography":"Biography",
    "Comedy":"Comedy",
    "Crime":"Crime",
    "Documentary":"Documentary",
    "Drama":"Drama",
    "Family":"Family",
    "Fantasy":"Fantasy",
    "Film-Noir":"Film-Noir",
    "Game-Show":"Game-Show",
    "History":"History",
    "Horror":"Horror",
    "Music":"Music",
    "Musical":"Musical",
    "Mystery":"Mystery",
    "News":"News",
    "Reality Tv":"Reality Tv",
    "Romance":"Romance",
    "Sci-Fi":"Sci-Fi",
    "Sport":"Sport",
    "Talk-Show":"Talk-Show",
    "Thriller":"Thriller",
    "War":"War",
    "Western":"Western"
  },
  "en":{
    "title":"电影在线",
    "search_hint":"来找找看",
    "order":"Order",
    "ascending":"正序",
    "descending":"倒序",
    "genre":"Genre",
    "rating":"最低评分",
    "search":"搜索",
    "random":"随便来一个",
    "pager_label":"翻页",
    "no_result_hint":"没找到。",
    "Title":"标题",
    "Year":"年份",
    "Rating":"评分",
    "Peers":"年龄",
    "Seeds":"种子",
    "Downloads":"下载数",
    "Popularity":"人气",
    "Upload Date":"上传时间",
    "All":"所有",
    "Action":"动作",
    "Adventure":"冒险",
    "Animation":"动画",
    "Biography":"传记",
    "Comedy":"喜剧",
    "Crime":"犯罪",
    "Documentary":"纪录片",
    "Drama":"戏剧",
    "Family":"家庭",
    "Fantasy":"幻想",
    "Film-Noir":"黑色电影",
    "Game-Show":"游戏节目",
    "History":"历史",
    "Horror":"恐怖",
    "Music":"音乐",
    "Musical":"音乐",
    "Mystery":"玄幻",
    "News":"新闻",
    "Reality Tv":"真人秀",
    "Romance":"浪漫",
    "Sci-Fi":"科幻",
    "Sport":"运动",
    "Talk-Show":"脱口秀",
    "Thriller":"惊悚",
    "War":"战争",
    "Western":"西方"
  }
}
</i18n>
<template>
  <v-container fluid>
    <v-layout raw wrap xs12>
      <v-flex xs12 class="my-5 text-xs-center">
        <h1>{{ $t("title") }}</h1>
      </v-flex>

      <v-flex xs12>
        <v-combobox
          solo
          light
          clearable
          cache-items
          hide-no-data
          return-object
          item-text="title"
          loader-height="5"
          item-value="title"
          :placeholder="$t('search_hint')"
          :disabled="loading"
          :items="suggestions"
          :loading="thinking || loading"
          :autofocus="!$vuetify.breakpoint.xsOnly"
          :search-input.sync="query"
          @click:clear="clearResults"
          @change="openSuggestion($event)"
          @keydown.enter.native="search(true)"
          @input.native="updateSuggestions"
        >
          <template v-slot:item="{ item }">
            <div>
              <v-avatar :size="45">
                <img
                  :src="item.small_cover_image"
                  :alt="`${item.title}'s cover`"
                />
              </v-avatar>
              <span class="mx-3">
                <span v-html="maskSuggestion(item.title)"></span>
                - {{ item.year }}
              </span>
              <span v-if="$vuetify.breakpoint.mdAndUp">
                <v-chip
                  v-for="(genre, i) in item.genres"
                  :key="i"
                  label
                  small
                  class="mx-2"
                  color="primary"
                  >{{ genre }}</v-chip
                >
              </span>
            </div>
          </template>
        </v-combobox>
      </v-flex>

      <v-flex xs12 mb-5>
        <v-layout row wrap>
          <v-flex xs12 sm4 lg4 pa-2>
            <v-select
              solo
              v-model="sort"
              :disabled="loading"
              hide-details
              light
              :menu-props="{
                light: true,
                top: true,
                offsetY: true,
                offsetOverflow: true
              }"
              single-line
              :items="orderItems"
            >
              <template v-slot:prepend-inner>
                <div class="select-text">{{ $t("order") }}:</div>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs12 sm4 lg4 pa-2>
            <v-select
              solo
              v-model="genre"
              :disabled="loading"
              light
              :menu-props="{
                light: true,
                top: true,
                offsetY: true,
                offsetOverflow: true
              }"
              hide-details
              single-line
              :items="genreItems"
            >
              <template v-slot:prepend-inner>
                <div class="select-text">{{ $t("genre") }}:</div>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs12 sm4 lg4 pa-2>
            <v-select
              v-model="order"
              solo
              :menu-props="{
                light: true,
                top: true,
                offsetY: true,
                offsetOverflow: true
              }"
              :disabled="loading"
              light
              hide-details
              single-line
              :items="[
                { text: $t('ascending'), value: 'asc' },
                { text: $t('descending'), value: 'desc' }
              ]"
            >
              <template v-slot:prepend-inner>
                <div class="select-text">Sort:</div>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs12 pa-2 my-3 class="text-xs-center">
            <div class="subheading">{{ $t("rating") }}:</div>
            <v-rating
              v-model="rating"
              color="yellow"
              half-increments
              hover
              :disabled="loading"
            />
          </v-flex>
          <v-flex xs12 class="text-xs-center">
            <v-btn color="green" @click="search(true)" :disabled="loading">
              <v-icon left>fas fa-search</v-icon>{{ $t("search") }}
            </v-btn>
            <v-btn color="blue" @click="random" :disabled="loading">
              <v-icon left>fas fa-dice</v-icon>{{ $t("random") }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-if="movies" class="text-xs-center mb-5">
        <v-layout row>
          <v-btn
            icon
            large
            @click="cpage > 1 ? cpage-- : null"
            :disabled="loading"
          >
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
          <v-select
            dark
            :label="$t('pager_label')"
            v-model="cpage"
            :items="generatedPages"
            :disabled="loading"
            hide-details
            single-line
          />
          <v-btn
            icon
            large
            @click="cpage < pages ? cpage++ : null"
            :disabled="loading"
          >
            <v-icon>fas fa-chevron-right</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12 v-if="movies">
        <v-layout row wrap>
          <v-flex
            xs12
            sm4
            md3
            xl2
            v-for="(movie, index) in movies"
            :key="movie.id"
            class="pa-3 double-ms"
          >
            <movie-card :movie="movie" :tabindex="index" class="my-card" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="text-xs-center" v-else>
        <h1 class="title">{{ $t("no_result_hint") }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-if="movies" class="text-xs-center mb-5">
        <v-layout row>
          <v-btn
            icon
            large
            @click="cpage > 1 ? cpage-- : null"
            :disabled="loading"
          >
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
          <v-select
            dark
            :label="$t('pager_label')"
            v-model="cpage"
            :items="generatedPages"
            :disabled="loading"
            hide-details
            single-line
          />
          <v-btn
            icon
            large
            @click="cpage < pages ? cpage++ : null"
            :disabled="loading"
          >
            <v-icon>fas fa-chevron-right</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MovieCard from "../../components/MovieCard";
import { mapActions, mapGetters } from "vuex";
import { getMoviesList } from "../../utils/axios";

export default {
  components: {
    MovieCard
  },
  data() {
    return {
      query: "",
      rating: 0,
      order: "desc",
      sort: "date_added",
      genre: "all",
      loading: false,
      thinking: false,
      cpage: 1,
      generatedPages: [],
      suggestions: []
    };
  },
  methods: {
    ...mapActions(["loadMoviesList"]),
    readStorage(key) {
      const value = sessionStorage.getItem(key);
      return value !== null ? value : undefined;
    },
    openSuggestion(item) {
      sessionStorage.setItem("mse.query", item.title || item || "");
      if (typeof item !== "string") this.$router.push("/movies/" + item.id);
    },
    updateSuggestions() {
      this.thinking = true;
      getMoviesList({ query: this.query })
        .then(res => {
          if (res.data.status !== "ok")
            throw new Error(res.data.status_message);

          const data = res.data.data;
          if (data.movie_count === 0) return;
          this.suggestions = data.movies;
        })
        .catch(err => {
          console.log(err);
          this.Toast.fire({
            title: err.message,
            type: "error"
          });
        })
        .finally(() => (this.thinking = false));
    },
    search(resetPages = false) {
      if (resetPages) this.cpage = 1;

      const params = {
        query: this.query,
        rate: (this.rating * 10) / 5,
        order: this.order,
        sort: this.sort,
        genre: this.genre,
        page: this.cpage
      };

      this.loading = true;
      this.loadMoviesList(params)
        .catch(err => {
          console.error(err);
          this.Toast.fire({
            title: err.message,
            type: "error"
          });
        })
        .finally(() => (this.loading = false));
    },
    random() {
      let params = {
        query: this.query,
        rate: (this.rating * 10) / 5,
        order: this.order,
        sort: this.sort,
        genre: this.genre
      };

      this.loading = true;
      getMoviesList(params)
        .then(res => {
          if (res.data.status !== "ok")
            throw new Error(res.data.status_message);

          const data = res.data.data;
          const n = Math.round(Math.random() * (data.movie_count - 1) + 1);
          if (data.movie_count === 0) params = {};

          return getMoviesList({ ...params, limit: 1, page: n }).then(res => {
            if (res.data.status !== "ok")
              throw new Error(res.data.status_message);

            this.$router.push("/movies/" + res.data.data.movies[0].id);
          });
        })
        .catch(err => {
          console.log(err);
          this.Toast.fire({
            title: err.message,
            type: "error"
          });
        })
        .finally(() => (this.loading = false));
    },
    clearResults() {
      this.query = "";
      this.search(true);
    },
    maskSuggestion(text) {
      return text.replace(
        new RegExp(this.query, "gi"),
        a =>
          `<span style="background-color: #494949; color: rgba(255, 255, 255, 0.5);">${a}</span>`
      );
    }
  },
  watch: {
    cpage(n) {
      sessionStorage.setItem("mse.page", n);
      this.search();
    },
    pages(n) {
      this.generatedPages = [];
      if (n === 1) {
        return (this.generatedPages = [{ text: "1 / 1", value: 1 }]);
      }
      for (let i = 0; i < this.pages; i++)
        this.generatedPages.push({
          text: `${i + 1} / ${n}`,
          value: i + 1
        });
    },
    query: n => sessionStorage.setItem("mse.query", n || ""),
    rating: n => sessionStorage.setItem("mse.rating", n || 0),
    order: n => sessionStorage.setItem("mse.order", n || "desc"),
    sort: n => sessionStorage.setItem("mse.sort", n || "date_added"),
    genre: n => sessionStorage.setItem("mse.genre", n || "all")
  },
  computed: {
    orderItems() {
      return [
        { text: this.$t("Title"), value: "title" },
        { text: this.$t("Year"), value: "year" },
        { text: this.$t("Rating"), value: "rating" },
        { text: this.$t("Peers"), value: "peers" },
        { text: this.$t("Seeds"), value: "seeds" },
        { text: this.$t("Downloads"), value: "download_count" },
        { text: this.$t("Popularity"), value: "likes_count" },
        { text: this.$t("Upload Date"), value: "date_added" }
      ];
    },
    genreItems() {
      return [
        { text: this.$t("All"), value: "all" },
        { text: this.$t("Action"), value: "action" },
        { text: this.$t("Adventure"), value: "adventure" },
        { text: this.$t("Animation"), value: "animation" },
        { text: this.$t("Biography"), value: "biography" },
        { text: this.$t("Comedy"), value: "comedy" },
        { text: this.$t("Crime"), value: "crime" },
        { text: this.$t("Documentary"), value: "documentary" },
        { text: this.$t("Drama"), value: "drama" },
        { text: this.$t("Family"), value: "family" },
        { text: this.$t("Fantasy"), value: "fantasy" },
        { text: this.$t("Film-Noir"), value: "film-noir" },
        { text: this.$t("Game-Show"), value: "game-show" },
        { text: this.$t("History"), value: "history" },
        { text: this.$t("Horror"), value: "horror" },
        { text: this.$t("Music"), value: "music" },
        { text: this.$t("Musical"), value: "musical" },
        { text: this.$t("Mystery"), value: "mystery" },
        { text: this.$t("News"), value: "news" },
        { text: this.$t("Reality Tv"), value: "reality-tv" },
        { text: this.$t("Romance"), value: "romance" },
        { text: this.$t("Sci-Fi"), value: "sci-fi" },
        { text: this.$t("Sport"), value: "sport" },
        { text: this.$t("Talk-Show"), value: "talk-show" },
        { text: this.$t("Thriller"), value: "thriller" },
        { text: this.$t("War"), value: "war" },
        { text: this.$t("Western"), value: "western" }
      ];
    },
    ...mapGetters(["page", "pages", "movies"])
  },
  created() {
    const { readStorage } = this;
    document.title = "Live Torrent - Movies";
    const { query, genre, rating } = this.$route.query;
    this.query = query || readStorage("mse.query") || "";
    this.rating =
      parseInt(rating) || parseFloat(readStorage("mse.rating")) || 0;
    this.order = readStorage("mse.order") || "desc";
    this.sort = readStorage("mse.sort") || "date_added";
    this.genre = genre || readStorage("mse.genre") || "all";

    this.search(true);
  }
};
</script>

<style lang="scss" scoped>
.double-ms {
  @media only screen and (min-width: 400px) and (max-width: 799px) {
    max-width: 50%;
  }
}

.select-text {
  color: #222;
}
</style>
