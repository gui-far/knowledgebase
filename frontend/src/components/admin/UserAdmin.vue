<template>
  <div class="user-admin">
    <!-- Bootstrap for Vue, b-table really makes table creation easier -->
    <!-- MB3 MT3 = Matgin Boton 3 and Margin Top 3-->
    <b-form>
      <!-- Using v-model binding-->
      <input id="user-id" type="hidden" v-model="user.id" />

      <!-- Name and Email-->
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              :readonly="mode==='remove'"
              required
              placeholder="Informe o Nome do usuário..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              :readonly="mode==='remove'"
              required
              placeholder="Informe o E-mail do usuário..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!--Administrator Flag -->
      <b-form-checkbox id="user-admin" v-model="user.admin"  v-show="readonly === 'save'" class="mt-3 mb-3">Administrador?</b-form-checkbox>

      <!--Password & Confirm Password-->
      <b-row v-show="readonly === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Informe a Senha do usuário..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de Senha:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirme a Senha do usuário..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <!-- Button, render with "v-if" and "mode" -->
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Remover</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table hover striped :items="users" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>


<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UserAdmin",
  data: function() {
    return {
      mode: "save",
      user: {},
      users: [],
      //Here we will set the collumn names based on response propertie field
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formater: value => (value ? "Sim" : "Não")
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          //Remember that this reset will make "loadUsers()"
          this.reset();
        })
        .catch(showError);
    },

    remove() {
      const id = this.user.id;
      console.log(`${baseApiUrl}/users/${id}`);
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    }
  },

  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>