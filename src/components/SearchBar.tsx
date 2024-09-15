import { useContext, useState } from "react";
import { TableContext } from "../App";
import './styles.css';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const {setQuery} = useContext(TableContext);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') {
            setQuery(input);
        }
    }

    return(
        <div className="search">
            <input placeholder="Search by name, email or role" type="text" value={input} onChange={handleChange} onKeyDown={handleEnter}/>
        </div>
    )
}
export default SearchBar;