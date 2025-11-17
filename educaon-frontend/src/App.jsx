
import AppRoutes from "./routes/appRoutes";

function App() {
  return (
    <div>
      <AppRoutes />
      
    </div>
  );
}



export default App;
 
//   // Estado que armazena a lista de alunos vinda do backend
//   const [alunos, setAlunos] = useState([]);

//   // Função que busca os alunos no backend Django usando fetch
//   const carregarAlunos = async () => {
//     try {
//       // Chamada GET para a API
//       const response = await fetch("http://127.0.0.1:8000/api/alunos/");
      
//       // Converte resposta para JSON
//       const data = await response.json();
      
//       // Atualiza o estado com a lista retornada (ou array vazio para evitar erro)
//       setAlunos(data.alunos || []);
//     } catch (error) {
//       // Caso ocorra erro na requisição
//       console.error("Erro ao carregar alunos:", error);
//     }
//   };

//   // useEffect é executado automaticamente ao montar o componente
//   // Serve para carregar a lista de alunos ao abrir a página
//   useEffect(() => {
//     carregarAlunos(); // chama a função uma vez
//   }, []); // array vazio significa: apenas na inicialização

//   // Função executada quando um novo aluno é criado no componente AlunoForm
//   // Ela atualiza a lista chamando novamente carregarAlunos()
//   const handleAlunoCriado = (novoAluno) => {
//     carregarAlunos();
//   };

//   return (
//     <div className="app">
//       <h1>🎓 EducaOn - Sistema de Alunos</h1>

//       {/* Formulário de cadastro de aluno */}
//       <div className="section">
//         {/* Passamos a função handleAlunoCriado como prop para o formulário */}
//         <AlunoForm onAlunoCriado={handleAlunoCriado} />
//       </div>

//       {/* Exibição da lista de alunos */}
//       <div className="section">
//         <h2>Alunos Cadastrados ({alunos.length})</h2>

//         <div className="alunos-list">
//           {alunos.map((aluno) => (
//             // Card individual de aluno
//             <div key={aluno.id} className="aluno-card">
//               <h3>{aluno.nome}</h3>
//               <p>📧 {aluno.email}</p>
//               <p>📞 {aluno.numero}</p>
//             </div>
//           ))}

//           {/* Caso não exista nenhum aluno cadastrado */}
//           {alunos.length === 0 && <p>Nenhum aluno cadastrado ainda.</p>}
//         </div>
//       </div>
//     </div>
//   );


