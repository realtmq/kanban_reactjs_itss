import React, { useState } from 'react';
import Arrow from './Arrow';
//alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
/* 
  【TodoItemコンポーネント】
 ・Todoアイテムを表示する
 ・チェックボックスにチェックが入っているか管理する
 ・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
function TodoItem(props) {
  const { item, handleCheckboxClick, handleEditForm, handleDeleteForm, handleLeftArrow, handleRightArrow, handleSetColor } = props;

  // state lưu trạng thái đóng mở bảng màu 
  const [openPalete, setOpenPalete] = useState(false);

  // state lưu trạng thái đóng mở edit form
  const [openEdit, setOpenEdit] = useState(false);

  //state lưu giá trị nhập vào form chỉnh sửa
  const [editFormValue, setEditFormValue] = useState(item.text);

  //state lưu trạng thái màu của thẻ todo hiện tại
  const [curColor, setCurColor] = useState(item.color);

  //state lưu trạng thái của menu todoitem
  const [openMenu, setOpenMenu] = useState(false);


  const handleClickPalete = () => {
    const status = !openPalete;
    setOpenPalete(status);
  }

  const handleClickPaleteColor = (color) => {
    //setbackground 
    setCurColor(color.background);
    const newItem = { ...item, color: color.background }
    handleSetColor(newItem);


    //close palete
    const status = !openPalete
    setOpenPalete(status);

    //close menu
    setOpenMenu(!openMenu);
  }

  const handleClickMenuItem = () => {
    setOpenMenu(!openMenu);
  }

  const onClickArrow = () => {
    //dong menu item
    setOpenMenu(!openMenu)
  }

  const renderMenuItem = () => {
    if (openMenu === false) {
      return (
        <div className="todo-menu" onClick={handleClickMenuItem}>
          <i class="fas fa-ellipsis-v"></i>
        </div>
      )
    } else {
      return (
        <div className="todo-menu">
          <Arrow
            item={item}
            leftArrow={handleLeftArrow}
            rightArrow={handleRightArrow}
            onClickArrow={onClickArrow}
          />
          <div className="todo-palete item2" onClick={handleClickPalete}>
            <i className="fas fa-palette"></i>
          </div>
          <div className="todo-edit item3" onClick={handleClickEdit}>
            <i className="fas fa-pencil-alt"></i>
          </div>
          <div className="todo-delete item4" onClick={handleClickDelete}>
            <i className="far fa-trash-alt"></i>
          </div>
          <div className="todo-menu" onClick={handleClickMenuItem}>
            <i class="fas fa-ellipsis-v"></i>
          </div>
        </div>
      )
    }
  }

  const renderPaleteForm = () => {
    if (openPalete) {
      return (<div className="panel-optional">
        <div className="green-box" style={{ background: '#61BD4F' }} onClick={() => handleClickPaleteColor({ background: '#61BD4F' })}></div>
        <div className="yellow-box" style={{ background: '#F2D600' }} onClick={() => handleClickPaleteColor({ background: '#F2D600' })}></div>
        <div className="orange-box" style={{ background: '#FF9F1A' }} onClick={() => handleClickPaleteColor({ background: '#FF9F1A' })}></div>
        <div className="red-box" style={{ background: '#EB5A46' }} onClick={() => handleClickPaleteColor({ background: '#EB5A46' })}></div>
        <div className="violet-box" style={{ background: '#C377E0' }} onClick={() => handleClickPaleteColor({ background: '#C377E0' })}></div>
        <div className="white-box" style={{ background: '#ffffff' }} onClick={() => handleClickPaleteColor({ background: '#ffffff' })}></div>
        <div className="blue-box" style={{ background: '#0079BF' }} onClick={() => handleClickPaleteColor({ background: '#0079BF' })}></div>
      </div>)
    }
    else return
  }

  const handleClickEdit = () => {
    const status = !openEdit;
    setOpenEdit(status);
  }

  const renderEditForm = () => {
    if (openEdit === false) {
      return (
        // <span className={item.done ? 'has-text-grey-light' : ''}>
        <div>
          <span>
            {item.text}
          </span>
        </div>
      )
    } else {
      return (
        <input type="text" name='title' value={editFormValue} onChange={handleValueChange} onKeyDown={handlePressEnter}></input>
      )
    }
  }

  const handleValueChange = (e) => {
    setEditFormValue(e.target.value);
  }

  const handlePressEnter = (event) => {
    if (event.key === 'Enter') {
      // lấy được giá trị mới ở input, giờ phải lấy được id của todo
      const newItem = { ...item, text: editFormValue };
      // da lay duoc item moi-> gui len Todo de changeState
      handleEditForm(newItem)
      //cap nhat state de dong form
      setOpenEdit(false);

      //dong menu item
      setOpenMenu(!openMenu);
    }
  }

  const handleClickDelete = () => {
    //form alert
    confirmAlert({
      title: 'Deleting ' + item.text,
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            handleDeleteForm(item);
            //dong menu items
            setOpenMenu(!openMenu);
          }
        },
        {
          label: 'No',
          onClick: () => {
            //dong menu items
            setOpenMenu(!openMenu);
          }
        }
      ]
    });



  }




  return (
    <div className="panel-block" >
      <div className="panel-content" style={{ background: item.color }}>
        <div className="todo-content item1">
          {/* <input type="checkbox" onChange={() => handleCheckboxClick(item)} checked={item.done} /> */}

          {renderEditForm()}
        </div>

        {/* <Arrow
          item={item}
          leftArrow={handleLeftArrow}
          rightArrow={handleRightArrow}
        />
        <div className="todo-palete item2" onClick={handleClickPalete}>
          <i className="fas fa-palette"></i>
        </div>
        <div className="todo-edit item3" onClick={handleClickEdit}>
          <i className="fas fa-pencil-alt"></i>
        </div>
        <div className="todo-delete item4" onClick={handleClickDelete}>
          <i className="far fa-trash-alt"></i>
        </div> */}

        {renderMenuItem()}
      </div>
      {/* ket thuc noi dung cua mot todo */}
      {renderPaleteForm()}
      {/* cac action voi todo */}

    </div>
  )
}

export default TodoItem