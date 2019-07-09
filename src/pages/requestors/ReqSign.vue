// UploadPDF.vue

<template>
  <div>
    <h3>Upload PDF for Requestor</h3>
    <div class="row row-centered row-second">
      <div class="col-sm-6">
        <form @submit.prevent="sendFile" enctype="multipart/form-data">
          <label for="file" class="label">Upload File PDF</label>
          <div v-if="PDFs.message" :class="`message ${PDFs.error ? 'is-danger' : 'is-success'}`">
            <div class="message-body">{{ PDFs.message }}</div>
          </div>
          <div class="field">
            <div class="file is-boxed is-primary">
              <label class="file-field">
                <input type="file" name id ref="file" @change="selectFile" class="file-input" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a file...</span>
                </span>
                <span class="file-name" v-if="PDFs.file">{{PDFs.file.name}}</span>
              </label>
            </div>
          </div>
          <div class="field">
            <button class="button is-info">Send</button>
          </div>
        </form>
      </div>
      <div class="col-sm-6"></div>
    </div>
    <!--  -->
    <div class="row row-second" v-if="Responses.namePDF">
      <div class="col-sm-8">
        <!-- {{ fileRes }} -->
        <div
          v-if="Responses.resSign"
          :class="`message ${Responses.signStat ? 'is-danger' : 'is-success'}`"
        >
          <div class="message-body">{{ Responses.resSign + ". Status:" + Responses.status}}</div>
        </div>
        <embed
          :src="`${Responses.signStat ? 'http://localhost:58187/UploadFile/input/'+ Responses.namePDF : 'http://localhost:58187/UploadFile/input/'+ Responses.namePDF}`"
          width="100%"
          height="750px"
          type="application/pdf"
        />
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-header">
            <h5>Identitas Tanda Tangan</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="label">Req :</label>
              <select
                v-model="Issuers.selectIssuer"
                name="issuer"
                id="issuer"
                class="form-control"
                tabindex="12"
              >
                <option
                  v-for="i in Issuers.allIssuer"
                  :key="i.id"
                  :value="i.memberId"
                >{{ i.firstName + " " + i.lastName }}</option>
              </select>
              <p>{{ Issuers.selectIssuer }}</p>
            </div>
            <div class="form-group">
              <label for="label">author :</label>
              <input type="text" class="form-control" v-model="Signs.author" />
            </div>
            <div class="form-group">
              <label for="label">title dokumen:</label>
              <input type="text" class="form-control" v-model="Signs.title" />
            </div>
            <div class="form-group">
              <label for="label">subject :</label>
              <input type="text" class="form-control" v-model="Signs.subject" />
            </div>
            <div class="form-group">
              <label for="label">keyword :</label>
              <input type="text" class="form-control" v-model="Signs.keyword" />
            </div>
            <div class="form-group">
              <label for="label">reason :</label>
              <input type="text" class="form-control" v-model="Signs.reason" />
            </div>
            <div class="form-group">
              <label for="label">email kamu:</label>
              <input type="text" class="form-control" v-model="Signs.email" />
            </div>
            <div class="field">
              <button
                @click="postSign"
                class="btn btn-primary"
                type="submit"
                value="uploadArtikel"
              >Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APIENDPOINT, getHeader } from "../../config/app.config";
import { session } from "../../constants";
import axios from "axios";
export default {
  data() {
    return {
      PDFs: {
        file: "",
        message: "",
        error: false
      },
      Signs: {
        author: "",
        title: "",
        subject: "",
        keyword: "",
        reason: "",
        email: ""
      },
      Responses: {
        resSign: "",
        status: "",
        signStat: false
      },
      Issuers: {
        allIssuer: [],
        selectIssuer: ""
      }
    };
  },

  methods: {
    selectFile() {
      this.PDFs.file = this.$refs.file.files[0];
      this.PDFs.message = "";
      this.PDFs.error = false;
    },

    async sendFile() {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
      const formData = new FormData();
      formData.append("file", this.PDFs.file);
      try {
        var responPDF = await axios.post(
          "http://localhost:58187/api/uploadpdf",
          formData,
          getHeader()
        );
        this.Responses.namePDF = responPDF.data.FileName;
        this.Responses.IdSign = responPDF.data.IdSign;
        this.PDFs.message = "File has been Uploaded";
        this.PDFs.file = "";
        this.PDFs.error = false;
        console.log(responPDF);
      } catch (err) {
        this.PDFs.message = "Something went wrong";
        this.PDFs.error = true;
        console.log(err);
      }
    },

    postSign() {
      const authUser = JSON.parse(session);
      let newSigns = {
        author: this.Signs.author,
        title: this.Signs.title,
        subject: this.Signs.subject,
        keyword: this.Signs.keyword,
        reason: this.Signs.reason,
        email: this.Signs.email,
        requestorId: authUser.userId,
        issuerId: this.Issuers.selectIssuer,
        status: "waiting"
      };
      axios
        .put(
          "http://localhost:58187/api/reqsign/" + this.Responses.IdSign,
          newSigns,
          getHeader()
        )
        .then(res => {
          // eslint-disable-next-line
          console.log(res);
          this.Responses.signStat = false;
          this.Responses.resSign = "request has been send";
          this.Responses.status = "waiting for approval";
          this.Signs.author = "";
          this.Signs.title = "";
          this.Signs.subject = "";
          this.Signs.keyword = "";
          this.Signs.reason = "";
          this.Signs.email = "";
          this.Issuers.selectIssuer = "";
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          this.Responses.signStat = true;
        });
    }
  },
  created: function() {
    axios
      .get(APIENDPOINT + "/member/getissuer", getHeader())
      .then(res => {
        console.log(res);
        this.Issuers.allIssuer = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.row-centered {
  text-align: center;
}

.file {
  justify-content: center;
}

.row-second {
  margin-bottom: 22px;
}
</style>
