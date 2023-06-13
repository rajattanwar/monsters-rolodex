import { useState, useEffect } from 'react';
// import { Component } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';


const App = () => {

  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  const [title,setTitle] = useState('');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(users => {
        setMonsters(users)
      })
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);

  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldValue = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldValue);
  }

  const onTitleChange = (event) => {
    const TitleFieldValue = event.target.value.toLocaleLowerCase();
    setTitle(TitleFieldValue);
  }

  return (
    <div className='App'>
      <h1 className='app-title'>{title}</h1>
      <SearchBox onChangeHandler={onSearchChange} placeholder='Search Monsters' className='monsters-search-box' />
      <SearchBox onChangeHandler={onTitleChange} placeholder='Type Heading' className='monsters-search-box' />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}
// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   componentDidMount() {
//     console.log("I am Component Mount")
//     fetch(`https://jsonplaceholder.typicode.com/users`)
//       .then(response => response.json())
//       .then(users =>
//         this.setState(() => {
//           return { monsters: users };
//         },
//           () => {
//             // console.log(this.state.monsters);
//           }
//         )
//       );
//   }

//   componentDidUpdate(){
//     console.log("I have updated")
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState({ searchField });
//   }

//   render() {
//     console.log("I am render")
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     })

//     return (
//       <div className='App'>
//       <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler= {onSearchChange} placeholder='Search Monsters' className='monsters-search-box'/>
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
