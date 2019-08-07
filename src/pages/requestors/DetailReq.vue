<template>
  <div>
      <h4>Detail Request Signature</h4>
    
    <div class="row row-second">
      <div class="col-sm-8">
        <!-- {{ fileRes }} -->
         <div v-if="Responses.resAct" :class="`message ${Responses.actStat ? 'is-success' : 'is-danger'}`">
           <div class="message-body">{{ Responses.resAct }} to {{ PDFs.status }} {{ Responses.namePDF }}</div>
         </div>
        <embed
          :src="url"
          width="100%"
          height="850px"
          type="application/pdf"
        >
      </div>
      <div class="col-sm-4 identitas">
        <div class="card">
          <div class="card-header">
            <h5>Requestor n Issuer</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Requestor : {{ Responses.nameReq }}</li>
              <li class="list-group-item">Issuer : {{ Responses.nameIs }}</li>
            </ul>
          </div>
        </div>
        <br>
        <div class="card">
          <div class="card-header">
            <h5>Identitas from Requestor</h5>
          </div>
          <div class="card-body">
              <li class="list-group-item">Author : {{ Signs.author }}</li>
              <li class="list-group-item">Title : {{ Signs.title }}</li>
              <li class="list-group-item">Subject : {{ Signs.subject }}</li>
              <li class="list-group-item">Keyword : {{ Signs.keyword }}</li>
              <li class="list-group-item">Reason : {{ Signs.reason }}</li>
              <li class="list-group-item">Status : {{ PDFs.status }}</li>
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
  data() {
    return {
      url:'',
      PDFs : {
        status:"",
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
      Responses : {
        namePDF:"",
        resAct:"",
        IdSign:"",
        issuerId:"",
        reqId:"",
        nameIs:"",
        nameReq:"",
        actStat:false
      }
    };
  },
  methods: {
    
  },
  created() {
    axios
      .get(APIENDPOINT + "/requestor/sign/detail?id=" + this.$route.params.id, getHeader())
      .then(res => {
        this.Signs.author = res.data.author;
        this.Signs.title = res.data.title;
        this.Signs.subject = res.data.subject;
        this.Signs.keyword = res.data.keyword;
        this.Signs.reason = res.data.reason;
        this.Signs.email = res.data.email;
        this.Responses.IdSign = res.data.id;
        this.Responses.namePDF = res.data.pdfName;
        this.Responses.issuerId = res.data.issuerId;
        this.Responses.reqId = res.data.requestorId;
        this.PDFs.status = res.data.status;
        if (res.data.status == 'sign'){
          this.url = "http://localhost:58187/api/pdf/getSignPDF?signFile=sign_" + res.data.pdfName;
        } else {
          this.url = "http://localhost:58187/api/pdf/getPDF?nameFile=" + res.data.pdfName;
        }
        axios.get(APIENDPOINT + "/member/detail?memberId=" + this.Responses.issuerId, getHeader())
        .then((resp)=>{
          this.Responses.nameIs = resp.data.firstName +" "+ resp.data.lastName
        }).catch((err)=>{
          throw err
        })
        axios.get(APIENDPOINT + "/member/detail?memberId=" + this.Responses.reqId, getHeader())
        .then((respo)=>{
          this.Responses.nameReq = respo.data.firstName +" "+ respo.data.lastName
        }).catch((err)=>{
          throw err
        })
      })
      .catch((err) => {
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
