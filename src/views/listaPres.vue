<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="1" class="ml-6 mt-10">
        <v-btn color="secondary" fab class="ml-16" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="10">
        <h1 class="secondary--text mt-8 ml-8" align="center">
            Candidatos al Congreso de la República
        </h1>
      </v-col>
    </v-row>
    <p></p>
    <v-divider></v-divider>

    <!-- BUSQUEDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA-->
    <v-row class="ml-12 mb-4">
      <v-col cols="4">
        <v-toolbar dense class="ml-12">
          <v-text-field
            hide-details
            single-line
            label="Buscar candidato"
            v-model="nombreCand"
          >
          </v-text-field>
          <v-btn icon v-if="nombreCand.length > 0" @click="clear">
            <v-icon>mdi-file-excel-box</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <!-- CARDS xddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd-->
    <v-container>
      <v-row justify="center">
        <v-col v-for="(card,i) in cards" :key="card" cols="12" sm="6" md="3">
          <v-card flat class="mt-16">
            <v-img
              :src=card.imagenUrl
              height="300px"
            >
            <v-avatar absolute right top  size="70" style="border-solid: white;">
                <img
                  :src="getImgUrl(2)"
                  :alt=card.name
                />
              </v-avatar>
            </v-img>
            <!--
                -->
            <v-list-item-content id="estiloInf" style="ml-4 mr-4">
              <div class="overline mb-4">DNI: {{card.dni}}</div>
              
              <v-list-item-title class="headline mb-1 secondary--text">
                {{card.name}}
              </v-list-item-title>
              <v-list-item-subtitle
                style="margin-left: 15px; margin-right: 20px"
                >Carrera: {{card.carrera}} 
                Nivel: {{card.nivel}}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-card-actions class="white justify-center">
              <v-btn small dark color="pink" :key="i"> Ver más </v-btn>
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
              
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
     <v-btn @click="mostrarMas(page--)">ANTERIOR</v-btn>
    <v-btn @click="mostrarMas(page++)">SIGUIENTE</v-btn>
    
    </v-container>

    <v-row style="height: 100px"></v-row>
  </v-container>
</template>
<script>
import { vsButton, vsSelect, vsPopup } from "vuesax";
import "vuesax/dist/vuesax.css";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "listaPres",
  data() {
    return {
      nombreCand: "",
      page: 1,
      cards: [],
      socials: [
        {
          icon: "mdi-facebook",
          color: "indigo",
        },
        {
          icon: "mdi-twitter",
          color: "cyan darken-1",
        },
      ],
    };
  },
  computed: {
    ...mapState(["partidos"]),
  },
  methods: {
      getImgUrl(pic) {
      return require("../assets/" + pic + ".png");
    },
    back() {
      this.$router.push("/candidatos");
    },
    clear() {
      this.nombreCand = "";
      // this.listaComidas()
    },
    getImage() {
      const min = 550;
      const max = 560;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    limpiar(value){
        return value.replace(/<?li>/g," ")
    },
    async mostrarMas(param){
      this.cards= [];
           try{
            //const candDB = await this.axios.get('v1/candidato?max=10&min=1')
            //const candDB = await this.axios.get('v1/candidato?max=10&min=1&nombre=Sara')

            const candDB = await this.axios.get(`v1/candidato?max=10&min=${param}`)

          await candDB.data.forEach(element => {
                   let ite = {}
                   ite.id = element.id;
                   ite.deudaSunat=element.deudaSunat;
                   ite.name= element.nombre;
                   ite.dni=element.dni;
                   ite.edad=element.edad;
                   ite.generacion=element.generacion;
                   ite.licencia=element.licencia;
                   ite.nivelSocioEconomico=element.nivelSocioEconomico;
                   ite.sexo=element.sexo;
                  ite.imagenUrl=element.imagenUrl;
                  ite.carrera=element.educaciones[0].carrera.replace("</li>"," ");
                  ite.nivel=element.educaciones[0].nivel;
                  ite.concluida=element.educaciones[0].concluida;
                   this.cards.push(ite)
            });
            
           console.log(candDB);
           console.log(this.cards);

           }catch(error){
               console.log(error);
           }
       },
  
    async obtenerLista(){
           try{
            //const candDB = await this.axios.get('v1/candidato?max=10&min=1')
            //const candDB = await this.axios.get('v1/candidato?max=10&min=1&nombre=Sara')

            const candDB = await this.axios.get('v1/candidato?max=10')

          await candDB.data.forEach(element => {
                   let ite = {}
                   ite.id = element.id;
                   ite.deudaSunat=element.deudaSunat;
                   ite.name= element.nombre;
                   ite.dni=element.dni;
                   ite.edad=element.edad;
                   ite.generacion=element.generacion;
                   ite.licencia=element.licencia;
                   ite.nivelSocioEconomico=element.nivelSocioEconomico;
                   ite.sexo=element.sexo;
                  ite.imagenUrl=element.imagenUrl;
                  ite.carrera=element.educaciones[0].carrera.replace("</li>"," ");
                  ite.nivel=element.educaciones[0].nivel;
                  ite.concluida=element.educaciones[0].concluida;
                   this.cards.push(ite)
            });
            
           console.log(candDB);
           console.log(this.cards);

           }catch(error){
               console.log(error);
           }
       },
       
  },
  
  created(){
      this.obtenerLista()
  }
};
</script>

<style>
#estiloInf > .v-list-item__subtitle {
  white-space: normal;
  font-size: 12px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 5px;
}
#estiloInf > .v-list-item__title {
  white-space: normal;
}
</style>