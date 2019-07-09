// UploadPDF.vue

<template>
  <div>
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
                <input type="file" name id ref="file" @change="selectFile" class="file-input">
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
      <div class="col-sm-6">
        <form @submit.prevent="sendCert" enctype="multipart/form-data">
          <label for="file" class="label">Upload File Sertifikat</label>
          <div v-if="Certifs.mesCert" :class="`message ${Certifs.errCert ? 'is-danger' : 'is-success'}`">
            <div class="message-body">{{ Certifs.mesCert }}</div>
          </div>
          <div class="field">
            <div class="file is-boxed is-primary">
              <label class="file-field">
                <input type="file" name id ref="cert" @change="selectCert" class="file-input">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a cert...</span>
                </span>
                <span class="file-name" v-if="Certifs.cert">{{Certifs.cert.name}}</span>
              </label>
            </div>
          </div>
          <div class="field">
            <button class="button is-info">Send</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row row-second" v-if="Responses.namePDF">
      <div class="col-sm-8">
        <!-- {{ fileRes }} -->
         <div v-if="Certifs.mesCert" :class="`message ${Certifs.errCert ? 'is-danger' : 'is-success'}`"></div>
        <embed
          :src="`${Responses.signStat ? 'http://localhost:58187/UploadFile/output/sign_'+ Responses.namePDF : 'http://localhost:58187/UploadFile/input/'+ Responses.namePDF}`"
          width="100%"
          height="750px"
          type="application/pdf"
        >
      </div>
      <div class="col-sm-4">
        <label for="title" class="label">Identitas Tanda Tangan</label>
        <div class="form-group">
          <label for="label">author :</label>
          <input type="text" class="form-control" v-model="Signs.author">
          <!-- <input id="author" class="input" v-model="author" type="text" placeholder="Nama penulis..."> -->
        </div>
        <div class="form-group">
          <label for="label">title :</label>
          <input type="text" class="form-control" v-model="Signs.title">
        </div>
        <div class="form-group">
          <label for="label">subject :</label>
          <input type="text" class="form-control" v-model="Signs.subject">
        </div>
        <div class="form-group">
          <label for="label">keyword :</label>
          <input type="text" class="form-control" v-model="Signs.keyword">
        </div>
        <div class="form-group">
          <label for="label">reason :</label>
          <input type="text" class="form-control" v-model="Signs.reason">
        </div>
        <div class="form-group">
          <label for="label">email :</label>
          <input type="text" class="form-control" v-model="Signs.email">
        </div>
        <div class="form-group">
          <label for="label">location :</label>
          <input type="text" class="form-control" v-model="Signs.location">
        </div>
        <div class="form-group">
          <label for="label">password :</label>
          <input type="password" class="form-control" v-model="Signs.password">
        </div>
        <div class="field">
          <!-- <button class="button is-danger">Sign</button> -->
          <button
            @click="postSign"
            class="button button--main"
            type="submit"
            value="uploadArtikel"
          >Kirim</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UploadPDF",

  data() {
    return {
      PDFs : {
        file: "",
        message: "",
        error: false
      },
      Certifs : {
        mesCert: "",
        cert: "",
        errCert: false,
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
      Responses : {
        namePDF:"",
        nameCert:"",
        resSign:"",
        IdSign:"",
        signStat:false
      }
    };
  },

  methods: {
    selectFile() {
      this.PDFs.file = this.$refs.file.files[0];
      this.PDFs.message = "";
      this.PDFs.error = false;
    },

    selectCert() {
      this.Certifs.cert = this.$refs.cert.files[0];
      this.Certifs.mesCert = "";
      this.Certifs.errCert = false;
    },

    async sendFile() {
      const formData = new FormData();
      formData.append("file", this.PDFs.file);
      // axios.post("http://localhost:58187/api/uploadpdf", formData,{
      //   headers: {
      //     "authorization":"Bearer ",
      //   }
      // })
      // .then(res => {
      //   /* eslint-disable */
      //   console.log(res)
      //   this.message = "File has been Uploaded"
      //   this.file = ""
      //   this.error = false
      // })
      // .catch(err => {
      //   console.log(err)
      //   this.message = "Something went wrong"
      //   this.error = true
      // });
      try {
        var responPDF = await axios.post("http://localhost:58187/api/uploadpdf", formData);
        this.Responses.namePDF = responPDF.data.FileName; 
        this.Responses.IdSign = responPDF.data.IdSign; 
        this.PDFs.message = "File has been Uploaded";
        this.PDFs.file = "";
        this.PDFs.error = false;
        console.log(responPDF);
      } catch (err) {
        this.PDFs.message = "Something went wrong";
        this.PDFs.error = true;
      }
    },

    async sendCert() {
      const formCert = new FormData();
      formCert.append("cert", this.Certifs.cert);
      try {
        var resCert = await axios.put("http://localhost:58187/api/uploadcert/" + this.Responses.IdSign, formCert);
        this.Responses.nameCert = resCert.data.FileName;
        this.Certifs.mesCert = "Certificate has been Uploaded";
        this.Certifs.cert = "";
        this.Certifs.errCert = false;
        console.log(resCert);
      } catch (err) {
        console.log(err);
        this.Certifs.mesCert = "Something went wrong";
        this.Certifs.errCert = true;
      }
    },

    postSign() {
      let newSigns = {
        author: this.Signs.author,
        title: this.Signs.title,
        subject: this.Signs.subject,
        keyword: this.Signs.keyword,
        reason: this.Signs.reason,
        email: this.Signs.email,
        location: this.Signs.location,
        pdfName: this.Responses.namePDF,
        certName: this.Responses.nameCert,
        password: this.Signs.password
      }
      
      axios.put("http://localhost:58187/api/sign/" + this.Responses.IdSign, newSigns).then(res => {
        // eslint-disable-next-line
        console.log(res);
        this.Responses.signStat = true;
        this.Signs.author       = "";
        this.Signs.title        = "";
        this.Signs.subject      = "";
        this.Signs.keyword      = "";
        this.Signs.reason       = "";
        this.Signs.email        = "";
        this.Signs.location     = "";
        this.Responses.nameCert = "";
        this.Signs.password     = "";
      })
      .catch((err)=>{
        // eslint-disable-next-line
        console.log(err);
      });
    }
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
