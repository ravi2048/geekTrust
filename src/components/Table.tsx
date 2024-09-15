import SearchBar from './SearchBar';
import Pagination from './Pagination';
import './styles.css';
import DeleteIcon from '../assets/delete-icon.svg';
import EditIcon from '../assets/edit-icon.png';
import CheckIcon from '../assets/check-icon.png';
import { useContext, useRef, useState } from 'react';
import { TableContext } from '../App';
import { IUser } from '../interfaces/user';

const Table = () => {
    const [selectedForEdit, setSelectedForEdit] = useState<number>(-1);
    const [editableRowVals, setEditableRowVals] = useState<IUser>({
        id: -1,
        name: '',
        email: '',
        role: '',
        checked: false
    });
    let checkAllFlag = useRef(false);

    const {data, setData, page, pageSize} = useContext(TableContext);
    const fData = data.slice((page-1)*pageSize, page*pageSize);

    function handleDelete(id: number) {
        const newD = data.filter((item, _) => item.id!==id);
        setData(newD);
    }

    function handleCheckChange(idx: number) {
        const offset = (page-1) * pageSize;
        const actualIdx = idx + offset;
        const newD = [
            ...data.slice(0, actualIdx),
            {...data[actualIdx], checked: !(!!data[actualIdx].checked)},
            ...data.slice(actualIdx+1)
        ];
        setData(newD);
    }

    function handleCheckAll() {
        checkAllFlag.current = !checkAllFlag.current;
        const newFD = fData.map((item, _) => {
            return {...item, checked: checkAllFlag.current}
        })
        setData([
            ...data.slice(0, (page-1)*pageSize),
            ...newFD,
            ...data.slice(page*pageSize)
        ]);
    }

    function handleSelectForEdit(user: IUser) {
        setSelectedForEdit(user.id);
        setEditableRowVals(user);
    }

    function handleEditChange(e: any) {
        setEditableRowVals((prev) => {
            const {name, value} = e.target;
            return {...prev, [name]: value}
        })
    }

    function handleSave(id: number) {
        const newD = data.map((item, _) => {
            if(item.id === id) {
                return editableRowVals
            } else {
                return item;
            }
        });
        setData(newD);
        setSelectedForEdit(-1);
    }

    return (
        <div className='container'>
            <SearchBar/>
            <table>
                <thead>
                    <tr>
                        <th style={{width: '20%'}}>
                            <input type="checkbox" checked={checkAllFlag.current} onChange={handleCheckAll} /> Select All
                        </th>
                        <th style={{width: '30%'}}>Name</th>
                        <th style={{width: '35%'}}>Email</th>
                        <th style={{width: '10%'}}>Role</th>
                        <th style={{width: '5%'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fData.length ? fData.map((item, idx) => (
                            <tr key={item.email+item.id} className={item.checked ? 'selected-row' : ''}>
                                <td>
                                    <input type="checkbox" checked={!!item.checked} onChange={() => handleCheckChange(idx)}/>
                                </td>
                                <td>
                                    <input name='name' className={selectedForEdit === item.id ? 'selected-edit' : ''} type='text' value={selectedForEdit===item.id ? editableRowVals.name : item.name} onChange={handleEditChange} disabled={selectedForEdit === -1}/>
                                </td>
                                <td>
                                    <input name='email' className={selectedForEdit === item.id ? 'selected-edit' : ''} type='text' value={selectedForEdit===item.id ? editableRowVals.email : item.email} onChange={handleEditChange} disabled={selectedForEdit === -1}/>
                                </td>
                                <td>
                                    <input name='role' className={selectedForEdit === item.id ? 'selected-edit' : ''} type='text' value={selectedForEdit===item.id ? editableRowVals.role : item.role} onChange={handleEditChange} disabled={selectedForEdit === -1}/>
                                </td>
                                <td className='action'>
                                    {
                                        selectedForEdit === item.id ?
                                        <button className='save' onClick={() => handleSave(item.id)}>
                                            <img src={CheckIcon}/>
                                        </button>
                                        : 
                                        <button className='edit' onClick={() => handleSelectForEdit(item)}>
                                            <img src={EditIcon}/>
                                        </button>
                                    }
                                    
                                    
                                    <button className='delete' onClick={() => handleDelete(item.id)}>
                                        <img src={DeleteIcon}/>
                                    </button>
                                </td>
                            </tr>
                        )) : null
                    }
                </tbody>
            </table>
            <Pagination checkAllFlag={checkAllFlag}/>
        </div>
    )
}
export default Table;