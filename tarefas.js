const categorias = { Lazer: "lazer", Compras: "compras", Estudos: "estudos" };
const tarefas = [
  { nome: "Comprar leite", categoria: categorias.Compras, realizada: false },
  { nome: "Escutar chimbinha", categoria: categorias.Lazer, realizada: true },
];

const listaTarefas = document.getElementById("lista-tarefas");
const nomeDaNovaTarefa = document.getElementById("nova-tarefa-nome");
const botaoNovaTarefa = document.getElementById("incluir-nova-tarefa");
const filtroSelecionado = document.getElementById("filtro-de-categoria");

listaTarefas.innerHTML = "";

const inserirTarefa = (tarefa, oculto) => {
  const el = document.createElement("li");
  el.innerHTML = tarefa.nome;
  el.classList.add("item-tarefa");
  el.classList.add("categoria-" + tarefa.categoria);
  el.addEventListener("click", () => {
    const toggle = el.classList.toggle("marcado");
    tarefas.map((item) => {
      if (item.nome === el.innerHTML) item.realizada = toggle;
    });
  });
  oculto && el.classList.add("retido-no-filtro");
  tarefa.realizada && el.classList.add("marcado");
  listaTarefas.appendChild(el);
};

tarefas.map((tarefa) => inserirTarefa(tarefa));

botaoNovaTarefa.addEventListener("click", () => {
  const nome = nomeDaNovaTarefa.value;
  const categoria = document.getElementById("nova-tarefa-categoria").value;
  inserirTarefa({ nome, categoria, realizada: false });
  nomeDaNovaTarefa.value = "";
  nomeDaNovaTarefa.focus();
});

filtroSelecionado.addEventListener("change", (e) => {
  const filtroAtual = e.target.value;
  Array.from(listaTarefas.children).forEach((item) => {
    filtroAtual && !item.classList.contains("categoria-" + filtroAtual)
      ? item.classList.add("retido-no-filtro")
      : item.classList.remove("retido-no-filtro");
  });
});

nomeDaNovaTarefa.addEventListener(
  "keypress",
  (e) => e.key == "Enter" && botaoNovaTarefa.click()
);
