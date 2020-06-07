import { toast } from "react-toastify";

export const addLoading = () => {
  document.body.classList.add("preloader");

  if (document.getElementById("sidebar")) {
    const sidebar: any = document.getElementById("sidebar");
    sidebar.classList.remove("active");
  }

  if (!document.getElementById("preloader")) {
    const divPreloader = document.createElement("div");
    divPreloader.setAttribute("id", "preloader");

    const divBox = document.createElement("div");
    divBox.classList.add("preloader-box");

    for (let i = 0; i <= 3; i++) {
      const div = document.createElement("div");
      div.classList.add("item");
      div.classList.add("item-" + (i + 1));
      divBox.appendChild(div);
    }

    divPreloader.appendChild(divBox);

    document.body.appendChild(divPreloader);
  }
};

export const removeLoading = () => {
  document.body.classList.remove("preloader");
  if (document.getElementById("preloader")) {
    const preloader: any = document.getElementById("preloader");
    preloader.remove();
  }
};

export const errorsMessage = (err: any) => {
  if (err) {
    let message =
      "Algo deu errado no servidor, informe o erro: " +
      err.statusText +
      " ao administrador";

    if (!err.response) {
      if (err.status === 400) {
        message =
          "Você não tem permissão para ver isso, informe um usuário e senha válidos.\n" +
          err.error.hint;
      }
      if (err.status === 401) {
        message =
          "Você não tem permissão para ver isso, informe um usuário e senha válidos";
      }
      if (err.status === 422) {
        message = "Falha de validação, verifique os campos";
      }
      if (err.status === 404) {
        message = "Nenhuma rota encontrada com este arquivo ou foi removido";
      }
      if (err.status === 500) {
        message =
          "Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos";
      }
    } else {
      if (err.response.status === 400) {
        message =
          "Erro de validação de dados, informe todos os dados obrigatórios";
      }
      if (err.response.status === 401) {
        message =
          "Você não tem permissão para ver isso, informe um usuário e senha válidos";
      }
      if (err.response.status === 422) {
        message = "Falha de validação, verifique os campos";
      }
      if (err.response.status === 404) {
        message = "Nenhuma rota encontrada com este arquivo ou foi removido";
      }
      if (err.response.status === 500) {
        message =
          "Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos";
      }
    }
    toast.info(message);
    return err;
  }
  return null;
};
