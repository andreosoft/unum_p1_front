<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr v-for="(el, i) of element" :key="i">
          <td style="width: 250px">
            <b>{{ $t(getTitle(i)) }}</b>
          </td>
          <td class="text-xs-left">
            <ClinicalRecordElement
              v-if="typeof el === 'object'"
              :element="el"
              :titleArray="titleArray"
            />
            <div v-else-if="i.substring(i.length - 5) === '_file'">
              <div v-if="typeof el === 'boolean'">
                <div v-for="group in getFiles(i)" :key="group.name">
                  <div>
                    {{ group.group_name ? group.group_name : $t("other") }}
                    <v-chip-group column>
                      <v-chip
                        outlined
                        v-for="file in group.files"
                        :href="download(file.file)"
                        target="_blank"
                        :key="file.file"
                      >
                        {{ file.name }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </div>
              </div>
              <a v-else :href="download(el)" target="_blank">
                {{ $t("Download attached file") }}
              </a>
            </div>
            <div v-else>{{ el }}</div>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import api from "@/config/api";
export default {
  name: "ClinicalRecordElement",
  props: {
    value: Boolean,
    element: null,
    titleArray: [],
    files: null,
  },
  created() {
    //console.log("titleArray", this.titleArray);
  },
  methods: {
    getFiles(el) {
      let files = this.files[el];
      return files;
    },
    getTitle(title) {
      //      if (!title || !this.titleArray) return title;
      let isFiles = false;
      if (title.substring(title.length - 5) === "_file") {
        title = title.substring(title.length - 5, 0);
        isFiles = true;
      }
      let res =
        this.titleArray.find((el) => {
          return el.name.toLowerCase() === title.toLowerCase();
        })?.title || title;
      if (isFiles) {
        res = `${res} 
(${this.$t("files")})`;
      }
      return res;
    },
    download(id) {
      return id ? `http://api.neomedy.com${api.getFile}/${id}` : "";
    },
  },
  computed: {},
};
</script>