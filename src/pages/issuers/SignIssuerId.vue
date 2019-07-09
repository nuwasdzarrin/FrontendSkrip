// Sign pdf from requestor doing by issuer

<template>
  <div>
    <h4>Sign PDF from Requestor</h4>
    <h6>{{ $route.params.id }}</h6>
    <!-- {{ fileRes }} -->
    <div v-if="Responses.resSign" :class="`message ${Responses.signStat ? 'is-success' : 'is-danger'}`">
      <div class="message-body">Sign {{ Responses.namePDF }} is Successful</div>
    </div>
    <div class="row row-second">
      <div class="col-sm-8">
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
            <h5>Identitas from Requestor</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Author : {{ Signs.author }}</li>
              <li class="list-group-item">Title : {{ Signs.title }}</li>
              <li class="list-group-item">Subject : {{ Signs.subject }}</li>
              <li class="list-group-item">Keyword : {{ Signs.keyword }}</li>
              <li class="list-group-item">Reason : {{ Signs.reason }}</li>
            </ul>
          </div>
        </div>
        <br />
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
            </ul>
          </div>
        </div>
        <br />
        <div class="card">
          <div class="card-header">
            <h5>Complete Signature Identity</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="label">location :</label>
              <input type="text" class="form-control" v-model="Signs.location" />
            </div>
            <div class="form-group">
              <label for="label">password :</label>
              <input
                type="password"
                class="form-control"
                v-model="Signs.password"
                placeholder="password certificate"
              />
            </div>
            <div class="field">
              <button
                @click="postSign"
                class="btn btn-success"
                type="submit"
                value="Sign"
              >Sign this PDF</button>
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
  name: "UploadPDF",

  data() {
    return {
      Certs: {
        allCert: [],
        selCert: ""
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
        requestorId:"",
        issuerId:"",
        resSign: "",
        IdSign: "",
        status: "",
        signStat: false
      }
    };
  },
  methods: {
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
        certName: this.Certs.selCert,
        password: this.Signs.password,
        requestorId : this.Responses.requestorId,
        issuerId : this.Responses.issuerId
      };
      axios
        .put(
          APIENDPOINT + "/sign/" + this.Responses.IdSign,
          newSigns,
          getHeader()
        )
        .then(res => {
          this.Responses.signStat = true;
          this.Responses.resSign = "Sign Successful";
          this.Signs.author = "";
          this.Signs.title = "";
          this.Signs.subject = "";
          this.Signs.keyword = "";
          this.Signs.reason = "";
          this.Signs.email = "";
          this.Signs.location = "";
          this.Signs.password = "";
          this.Certs.selCert = "";
        })
        .catch(err => {
          throw err
          this.Responses.signStat = false;
          this.Responses.resSign = "Sign Unsuccessful";
        });
    }
  },
  created() {
    const userId = JSON.parse(session).userId;
    axios
      .get(APIENDPOINT + "/sign/" + this.$route.params.id, getHeader())
      .then(res => {
        axios
          .get(APIENDPOINT + "/uploadcert?memberId=" + userId, getHeader())
          .then(resp => {
            this.Certs.allCert = resp.data;
          })
          .catch(err => {
            console.log(err);
          });
        this.Signs.author = res.data.author;
        this.Signs.title = res.data.title;
        this.Signs.subject = res.data.subject;
        this.Signs.keyword = res.data.keyword;
        this.Signs.reason = res.data.reason;
        this.Signs.email = res.data.email;
        this.Responses.IdSign = res.data.id;
        this.Responses.namePDF = res.data.pdfName;
        this.Responses.requestorId = res.data.requestorId;
        this.Responses.issuerId = res.data.issuerId;
        this.Responses.status = "sign";
        console.log(res)
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
  padding-right: 40px;
}

.identitas {
  background-color: rgb(231, 231, 231);
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
