<i18n>
{
  "en":{
    "Information":"Information",
    "Language":"Language",
    "MPA Rating":"MPA Rating",
    "Unknown":"Unknown",
    "IMDB Code":"IMDB Code",
    "Year":"Year",
    "Watching":"Watching",
    "Downloads":"Downloads",
    "Uploaded At":"Uploaded At",
    "Suggested Movies":"Suggested Movies",
    "Description":"Description",
    "Casts":"Casts",
    "Share":"Share",
    "Captions":"Captions",
    "NoCaptions":"No captions found for this movie.",
    "MakeCaptions":"You can help by making subtitles and uploading it to",
    "Trailer":"Trailer",
    "SearchTrailer":"Search Youtube for the trailer."
  },
  "zh":{
    "Information":"信息",
    "Language":"语言",
    "MPA Rating":"MPA评分",
    "Unknown":"未知",
    "IMDB Code":"IMDB 代码",
    "Year":"年份",
    "Watching":"观看量",
    "Downloads":"下载量",
    "Uploaded At":"上传时间",
    "Suggested Movies":"推荐电影",
    "Description":"简介",
    "Casts":"演员表",
    "Share":"分享",
    "Captions":"字幕",
    "NoCaptions":"没有找到这部电影的字幕",
    "MakeCaptions":"你可以制作字幕上传到",
    "Trailer":"预告片",
    "SearchTrailer":"到Youtube上搜预告片"
  }
}
</i18n>

<template>
  <v-container fluid fill-height style="overflow: hidden">
    <v-layout raw wrap v-if="movie">
      <v-flex xs12 class="my-5 text-xs-center">
        <h1>
          {{ movie.title }}
          <bookmark-button
            v-if="movie"
            :bookmarkInfo="{
              name: `${movie.title} (${movie.year}) - Movie Page`,
              id: `movie::${movie.imdb_code}`,
              url: window.location.href
            }"
          />
        </h1>
      </v-flex>
      <v-flex xs12 sm6 md5 lg3 offset-lg1>
        <v-img
          :src="movie.large_cover_image"
          :lazy-src="movie.small_cover_image"
          min-height="400px"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular
                indeterminate
                color="blue"
              ></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </v-flex>
      <v-flex xs12 :mt-5="$vuetify.breakpoint.xsOnly" sm6 md5 offset-md2>
        <v-expansion-panel
          :popout="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
          :inset="$vuetify.breakpoint.smOnly"
          light
          :value="0"
        >
          <v-expansion-panel-content>
            <template v-slot:header>
              <div class="title">
                <v-icon left>fas fa-info-circle</v-icon>{{ $t("Information") }}
              </div>
            </template>
            <v-card>
              <v-card-text>
                <div>{{ $t("Language") }}: {{ movie.language }}</div>
                <div>
                  {{ $t("MPA Rating") }}:
                  {{ movie.mpa_rating || $t("Unknown") }}
                </div>
                <div>{{ $t("IMDB Code") }}: {{ movie.imdb_code }}</div>
                <div>{{ $t("Year") }}: {{ movie.year }}</div>
                <div>{{ $t("Rating") }}: {{ movie.rating }} / 10</div>
                <div>
                  {{ $t("Genres") }}:
                  <span v-for="(g, i) in movie.genres" :key="i" class="mx-1">{{
                    g
                  }}</span>
                </div>
                <div>{{ $t("Watching") }}: {{ movie.runtime }}</div>
                <div>{{ $t("Downloads") }}: {{ movie.download_count }}</div>
                <div>{{ $t("Uploaded At") }}: {{ movie.date_uploaded }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel
          :popout="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
          :inset="$vuetify.breakpoint.smOnly"
          light
        >
          <v-expansion-panel-content>
            <template v-slot:header>
              <div class="title">
                <v-icon left>fas fa-align-left</v-icon>{{ $t("Description") }}
              </div>
            </template>
            <v-card>
              <v-card-text>{{ movie.description_full }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel
          :popout="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
          :inset="$vuetify.breakpoint.smOnly"
          light
        >
          <v-expansion-panel-content>
            <template v-slot:header>
              <div class="title">
                <v-icon left>fas fa-mask</v-icon>{{ $t("Casts") }}
              </div>
            </template>
            <v-card>
              <v-card-text>
                <v-list two-line>
                  <v-list-tile
                    v-for="cast in movie.cast"
                    :key="cast.imdb_code"
                    avatar
                  >
                    <v-list-tile-avatar>
                      <img
                        :src="cast.url_small_image"
                        v-if="cast.url_small_image"
                      />
                      <v-icon v-else>fas fa-user-alt</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title
                        >{{ cast.name }} - IMDB Code:
                        {{ cast.imdb_code }}</v-list-tile-title
                      >
                      <v-list-tile-sub-title>{{
                        cast.character_name
                      }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel
          :popout="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
          :inset="$vuetify.breakpoint.smOnly"
          light
        >
          <v-expansion-panel-content>
            <template v-slot:header>
              <div class="title"><v-icon left>fas fa-film</v-icon>YTS</div>
            </template>
            <v-card>
              <v-card-text>
                <div>Trailer Code: {{ movie.yt_trailer_code }}</div>
                <div>
                  Visit movie on yts from
                  <a :href="movie.url" target="blank">here</a>.
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel
          :popout="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
          :inset="$vuetify.breakpoint.smOnly"
          light
        >
          <v-expansion-panel-content>
            <template v-slot:header>
              <div class="title">
                <v-icon left>fas fa-share-alt</v-icon>{{ $t("Share") }}
              </div>
            </template>
            <v-card>
              <v-card-text>
                <share-buttons
                  :title="`Watch for free '${movie.title_long}' movie`"
                  :desc="`Watch for free '${movie.title_long}' movie`"
                />
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel
          :popout="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.xsOnly"
          :inset="$vuetify.breakpoint.smOnly"
          light
        >
          <v-expansion-panel-content>
            <template v-slot:header>
              <div class="title">
                <v-icon left>fas fa-closed-captioning</v-icon>
                {{ $t("Captions") }}
              </div>
            </template>
            <v-card>
              <v-card-text style="text-wrap: wrap">
                <div v-if="loadingCaptions">Loading...</div>
                <div v-else-if="!captions.length">
                  {{ $t("NoCaptions") }}
                </div>
                <div v-else>
                  <a
                    :href="c.utf8"
                    :download="c.filename"
                    target="blank"
                    v-for="(c, i) in captions"
                    :key="i"
                    style="margin: 5px; display: inline-block"
                    >{{ c.lang }}</a
                  >.
                </div>
                <hr />
                <div>
                  {{ $t("MakeCaptions") }}
                  <a href="https://opensubtitles.org" title="open subtitles"
                    >opensubtitles.org</a
                  >
                </div>
                <div>
                  You can use
                  <a href="https://amara.org/en/" title="amara subtitle editor"
                    >Amara</a
                  >
                  online editor to make amazing subtitles
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

      <v-flex xs12 md10 offset-md1 mt-5>
        <h1 class="title mb-4">{{ $("Trailer") }}:</h1>
        <div class="my-3 text-xs-center">
          <v-btn
            tag="a"
            target="_blank"
            :href="
              `https://www.youtube.com/search?q=${movie.title} ${movie.year} trailer`
            "
            color="red"
          >
            <v-icon left>fab fa-youtube</v-icon>{{ $t("SearchTrailer") }}
          </v-btn>
          <v-btn
            tag="a"
            target="_blank"
            :href="trailer"
            color="red"
            v-if="trailer"
          >
            <v-icon left>fab fa-youtube</v-icon>Watch trailer on Youtube
          </v-btn>
        </div>
        <div
          id="player"
          data-plyr-provider="youtube"
          :data-plyr-embed-id="trailer"
          v-if="trailer"
        ></div>
      </v-flex>

      <v-flex xs12 mt-5>
        <h1 class="title mb-4">Screenshots:</h1>
        <v-carousel>
          <v-carousel-item
            contain
            :src="movie.large_screenshot_image1"
          ></v-carousel-item>
          <v-carousel-item
            contain
            :src="movie.large_screenshot_image2"
          ></v-carousel-item>
          <v-carousel-item
            contain
            :src="movie.large_screenshot_image3"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>

      <v-flex xs12 mt-5>
        <h1 class="subheading">Torrents:</h1>

        <v-layout raw wrap>
          <v-flex
            xs12
            md6
            xl4
            v-for="torrent in movie.torrents"
            :key="torrent.hash"
          >
            <v-card dark color="#445064" class="ma-2">
              <v-card-title class="title">
                {{ torrent.type }} - {{ torrent.quality }} -
                {{ torrent.size }} -
                <span class="subheading grey--text ml-1">{{
                  torrent.date_uploaded
                }}</span>
              </v-card-title>

              <v-card-text>
                Seeds/Peers: {{ torrent.seeds }}/{{ torrent.peers }}
                <v-text-field label="Hash" :value="torrent.hash" readonly>
                  <template v-slot:append>
                    <v-btn icon @click="$copy(torrent.hash)">
                      <v-icon small>fas fa-copy</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>

                <v-text-field
                  label="Stream"
                  :value="`${hostURL}/api/torrent/serve/${torrent.hash}/:video`"
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      icon
                      @click="
                        $copy(
                          `${hostURL}/api/torrent/serve/${torrent.hash}/:video`
                        )
                      "
                    >
                      <v-icon small>fas fa-copy</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>

                <v-btn color="green" tag="a" :href="torrent.url"
                  >Download (.torrent)</v-btn
                >
                <v-btn
                  color="purple"
                  tag="a"
                  :href="
                    `${hostURL}/player?torrentId=${torrent.hash}&caption=imdbid::${movie.imdb_code}`
                  "
                  >Watch</v-btn
                >
                <v-btn
                  color="blue"
                  tag="a"
                  :href="`${hostURL}/explorer?torrentId=${torrent.hash}`"
                  >Explore</v-btn
                >
                <v-btn
                  color="orange"
                  tag="a"
                  target="_blank"
                  :download="`${movie.slug}.mp4`"
                  :href="`${hostURL}/api/torrent/serve/${torrent.hash}/:video`"
                  >Download Movie (.mp4)</v-btn
                >
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 mt-5 v-if="movie.suggestedMovies">
        <h1 class="subheading">{{ $t("Suggested Movies") }}:</h1>

        <v-layout raw wrap mt-5>
          <v-flex
            xs6
            sm4
            md3
            lg3
            xl4
            v-for="suggestedMovie in movie.suggestedMovies"
            :key="suggestedMovie.id"
            class="pa-2 pb-4"
          >
            <movie-card :movie="suggestedMovie" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import MovieCard from "../../components/MovieCard";
import { loadCaptions } from "../../utils/axios";
import BookmarkButton from "../../components/BookmarkButton";

export default {
  name: "movie",
  components: {
    MovieCard,
    BookmarkButton
  },
  data() {
    return {
      movie: null,
      captions: [],
      loadingCaptions: false,
      trailer: null,
      bookmarkInfo: {
        id: "",
        name: "",
        url: ""
      }
    };
  },
  methods: {
    ...mapActions(["loadMoviePage"]),
    buildCaptionsQuery() {
      const { captions } = this;
      if (!captions.length) return "";
      let c = captions
        .map(c => `caption=url::${c.lang}::${c.langcode}::${c.utf8}`)
        .join("&");
      if (c.length) return "&" + c;
      return "";
    }
  },
  watch: {
    movie(n) {
      document.title = "Live Torrent - Movie - " + n.title_long;
    }
  },
  created() {
    const { id } = this.$route.params;
    this.loadingCaptions = true;

    this.loadMoviePage(id)
      .then(movie => (this.movie = movie))
      .then(movie => {
        window
          .movieTrailer(movie.title, movie.year)
          .then(url => (this.trailer = url))
          .catch(err => console.error(err));
        return movie;
      })
      .then(movie => {
        return loadCaptions(movie.imdb_code)
          .then(res => (this.captions = res.data))
          .catch(err => console.error(err))
          .finally(() => {
            this.loadingCaptions = false;
            if (this.captions) {
              this.captions = Object.values(this.captions);
            }
          });
      })
      .catch(err => console.error(err))
      .finally(() => {
        const controls = [
          "play-large", // The large play button in the center
          "rewind", // Rewind by the seek time (default 10 seconds)
          "play", // Play/pause playback
          "fast-forward", // Fast forward by the seek time (default 10 seconds)
          "progress", // The progress bar and scrubber for playback and buffering
          "current-time", // The current time of playback
          "duration", // The full duration of the media
          "mute", // Toggle mute
          "volume", // Volume control
          "settings", // Settings menu
          "fullscreen" // Toggle fullscreen
        ];

        const player = new window.Plyr("#player", {
          controls
        });

        // pause the video while playing on click
        // for more info https://github.com/sampotts/plyr/issues/718#issuecomment-451906473
        const { wrapper, container } = player.elements;
        if (!container || !wrapper) return;
        if (!container._clickListener) {
          container._clickListener = event => {
            const targets = [container, wrapper];

            // Ignore if click if not container or in video wrapper
            if (
              !targets.includes(event.target) &&
              !wrapper.contains(event.target)
            ) {
              return;
            }

            if (player.touch) player.togglePlay();
          };
          container.addEventListener("click", container._clickListener);
        }
        // end //
      });
  }
};
</script>
