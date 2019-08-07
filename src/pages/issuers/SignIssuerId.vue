// Sign pdf from requestor doing by issuer

<template>
  <div>
    <h4>Sign PDF from Requestor</h4>
    <!-- {{ fileRes }} -->
    <div v-if="Responses.resSign" :class="`message ${Responses.signStat ? 'is-success' : 'is-danger'}`">
      <div class="message-body">Sign {{ Responses.namePDF }} is Successful</div>
    </div>
    <div class="row row-second">
      <div class="col-sm-8">
        <canvas id="the-canvas" style="border:1px  solid black" v-if="Responses.status!='sign'"></canvas>
        <embed
          :src="PdfViewer.url"
          width="100%"
          height="1000px"
          type="application/pdf"
          v-if="Responses.status=='sign'"
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
            <h5>Signature Component</h5>
          </div>
          <div class="card-body">
             <div class="form-group">
               <label for="certificate">Select Certificate</label>
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
             </div>
            <div class="form-group">
              <label for="pic">Select Signature Pic</label>
               <select
                  v-model="Pics.selPic"
                  name="pic"
                  id="pic"
                  class="form-control"
                  tabindex="12"
                >
                  <option
                    v-for="n in Pics.pic"
                    :key="n.id"
                    :value="n.namePic"
                  >{{ n.namePic }}</option>
                </select>
             </div>
             <div class="form-group">
               <label for="visible">visibilitas digital signature :&nbsp;&nbsp; </label>
                <label class="radio-inline"><input type="radio" v-model="Signs.visible"  value=true checked>Yes</label>
                <label for="space"> &nbsp;or&nbsp; </label>
                <label class="radio-inline"><input type="radio" v-model="Signs.visible"  value=false>No</label>
             </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Certificate selected : {{ Certs.selCert }}</li>
              <li class="list-group-item">Sign Img selected : {{ Pics.selPic }}</li>
              <li class="list-group-item">Position of Sign: X= {{PdfViewer.positions.x}} , Y= {{PdfViewer.positions.y}}</li>
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
import axios from "axios";
export default {
  name: "UploadPDF",

  data() {
    return {
      Pics:{
        pic:[],
        selPic:''
      },
      PdfViewer: {
        position: null,
        positions: {
          x:'',
          y:''
        },
        pdfScale : 1,
        url : ''
      },
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
        password: "",
        visible: true
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
        issuerId : this.Responses.issuerId,
        picName : this.Pics.selPic,
        posX : this.PdfViewer.positions.x,
        posY : this.PdfViewer.positions.y,
        visible : this.Signs.visible
      };
      axios
        .put(
          APIENDPOINT + "/issuer/signReq?id=" + this.Responses.IdSign,
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
          this.PdfViewer.url = "http://localhost:58187/api/pdf/getSignPDF?signFile=sign_" + this.Responses.namePDF;
        })
        .catch(err => {
          throw err
          this.Responses.signStat = false;
          this.Responses.resSign = "Sign Unsuccessful";
        });
    },

    fetchPDF() {
      return import(
        'pdfjs-dist/webpack'
      ).
        then(pdfjs => pdfjs.getDocument(this.PdfViewer.url + this.Responses.namePDF)).
        then(pdf => (this.displayPage(pdf, 1))).
        then(pdf => (this.pdf = pdf))
    },

    renderPage(page) {
      var scale = this.PdfViewer.pdfScale; // render with global pdfScale variable
      var viewport = page.getViewport(scale);
      var canvas = document.getElementById("the-canvas");
      var context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    },

    displayPage(pdf, num) {
      var vm = this;
      pdf.getPage(num).then(function getPage(page) {
        vm.renderPage(page);
      });
    },

    FindPosition(oElement) {
      if (typeof oElement.offsetParent != "undefined") {
        for (
          var posX = 0, posY = 0;
          oElement;
          oElement = oElement.offsetParent
        ) {
          posX += oElement.offsetLeft;
          posY += oElement.offsetTop;
        }
        return [posX, posY];
      } else {
        return [oElement.x, oElement.y];
      }
    },

    GetCoordinates(e) {
      // console.log(e);
      var PosX = 0;
      var PosY = 0;
      if (!e) e = window.event;
      if (e.pageX || e.pageY) {
        PosX = e.pageX;
        PosY = e.pageY;
      } else if (e.clientX || e.clientY) {
        PosX =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        PosY =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      PosX = PosX - this.PdfViewer.position[0];
      PosY = PosY - this.PdfViewer.position[1];
      this.PdfViewer.positions.x = PosX;
      this.PdfViewer.positions.y = PosY;
    }
  },
  mounted() {
    const userId = JSON.parse(window.localStorage.getItem('lbUser')).userId;
    var vim = this;
    axios
      .get(APIENDPOINT + "/issuer/sign/detail?id=" + this.$route.params.id, getHeader())
      .then(res => {
        axios
          .get(APIENDPOINT + "/cert/getCert?memberId=" + userId, getHeader())
          .then(resp => {
            this.Certs.allCert = resp.data;
            axios
              .get(APIENDPOINT + "/picture/getPictureSign?memberId=" + userId, getHeader())
              .then(respo => {
                this.Pics.pic = respo.data;
              })
              .catch(err => {
                throw err;
              });
          })
          .catch((err) => {
            throw err
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
        this.Responses.status = res.data.status;
        if (res.data.status=='sign'){
          this.PdfViewer.url = "http://localhost:58187/api/pdf/getSignPDF?signFile=sign_" + res.data.pdfName;  
        } else {
          this.PdfViewer.url = "http://localhost:58187/api/pdf/getPDF?nameFile=sign_";
          vim.fetchPDF();
        }
      })
      .catch((err) => {
        throw err
      });

    var myImg = document.getElementById("the-canvas");
    myImg.onmousedown = this.GetCoordinates;
    this.PdfViewer.position = this.FindPosition(myImg);
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
