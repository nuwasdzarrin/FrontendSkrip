// UploadPDF.vue

<template>
  <div>
    <h3>Upload and Sign PDF</h3>
    <div class="row row-centered row-second">
      <div class="col-sm-8">
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
      <div class="col-sm-4">
        <div class="card">
          <div class="card-header">
            <h5>Choose your certificate</h5>
          </div>
          <div class="card-body">
            <select
              v-model="Certs.selCert"
              name="cert"
              id="cert"
              class="form-control"
              tabindex="12"
            >
              <option
                v-for="i in Certs.allCert"
                :key="i.id"
                :value="i.certificate"
              >{{ i.certificate }}</option>
            </select>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Certificate selected : {{ Certs.selCert }}</li>
              <li class="list-group-item">
                or upload new :
                <router-link :to="{ name: 'CertIssuer' }">certificate</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--   -->
    <div class="row row-second" v-if="Responses.namePDF">
      <div class="col-sm-8">
        <div v-if="Responses.resSign" :class="`message ${Responses.signStat ? 'is-success' : 'is-danger'}`">
          <div class="message-body">{{ Responses.resSign }} to sign {{ Responses.namePDF }}</div>
        </div>
        <embed
          :src="`${Responses.signStat ? 'http://localhost:58187/UploadFile/output/sign_'+ Responses.namePDF : 'http://localhost:58187/UploadFile/input/'+ Responses.namePDF}`"
          width="100%"
          height="1000px"
          type="application/pdf"
        />
      </div>
      <div class="col-sm-4 identitas">
        <div class="card">
          <div class="card-header">
            <h5>Siganture Identity</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="label">author :</label>
              <input type="text" class="form-control" v-model="Signs.author" />
            </div>
            <div class="form-group">
              <label for="label">title sign:</label>
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
              <label for="label">email :</label>
              <input type="text" class="form-control" v-model="Signs.email" />
            </div>
            <div class="form-group">
              <label for="label">location :</label>
              <input type="text" class="form-control" v-model="Signs.location" />
            </div>
            <div class="form-group">
              <label for="label">password :</label>
              <input type="password" class="form-control" v-model="Signs.password" />
            </div>
            <div class="field">
              <!-- <button class="button is-danger">Sign</button> -->
              <button
                @click="postSign"
                class="btn btn-success"
                type="submit"
                value="uploadArtikel"
              >Sign this pdf</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APIENDPOINT, getHeader } from "../../config/app.config";
import axios from "axios";
export default {
  name: "UploadPDF",

  data() {
    return {
      Certs: {
        allCert: [],
        selCert: ""
      },
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
        email: "",
        location: "",
        password: ""
      },
      Responses: {
        namePDF: "",
        resSign: "",
        IdSign: "",
        signStat: false
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
          APIENDPOINT + "/uploadpdf",
          formData,
          getHeader()
        );
        this.Responses.namePDF = responPDF.data.FileName;
        this.Responses.IdSign = responPDF.data.IdSign;
        this.PDFs.message = "File has been Uploaded";
        this.PDFs.file = "";
        this.PDFs.error = false;
      } catch (err) {
        this.PDFs.message = "Something went wrong";
        this.PDFs.error = true;
      }
    },
    postSign() {
      const userId = JSON.parse(window.localStorage.getItem('lbUser')).userId;
      let newSigns = {
        author: this.Signs.author,
        title: this.Signs.title,
        subject: this.Signs.subject,
        keyword: this.Signs.keyword,
        reason: this.Signs.reason,
        email: this.Signs.email,
        location: this.Signs.location,
        pdfName: this.Responses.namePDF,
        certName: this.Certs.selCert,
        password: this.Signs.password,
        requestorId : userId,
        issuerId : userId
      };
      // console.log(newSigns)
      axios
        .put(
          APIENDPOINT + "/sign/" + this.Responses.IdSign,
          newSigns,
          getHeader()
        )
        .then(res => {
          this.Responses.signStat = true;
          this.Responses.resSign = "Successful";
          this.Signs.author = "";
          this.Signs.title = "";
          this.Signs.subject = "";
          this.Signs.keyword = "";
          this.Signs.reason = "";
          this.Signs.email = "";
          this.Signs.location = "";
          this.Certs.selCert = "";
          this.Signs.password = "";
        })
        .catch(err => {
          throw err
          this.Responses.signStat = false
          this.Responses.resSign = "Unsuccessful";
        });
    }
  },
  created() {
    const userId = JSON.parse(window.localStorage.getItem('lbUser')).userId;
    axios
      .get(APIENDPOINT + "/uploadcert?memberId=" + userId, getHeader())
      .then(resp => {
        this.Certs.allCert = resp.data;
      })
      .catch(err => {
        throw err
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

.identitas {
  background-color: rgb(231, 231, 231);
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
