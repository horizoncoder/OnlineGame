import React, { Component } from 'react'

class Stats extends Component {

    constructor(props) {
        super(props)
    
       this.input=React.createRef()
       this.state={
           list:[],
          }
    }

    addTask=()=>{
    
    const Items={
            value:this.input.current.value,
            Date: new Date().toUTCString()
        };

        if(localStorage.getItem('list')==null){
            const list=[]
            list.push(Items);
            localStorage.setItem("list",JSON.stringify(list))
        }
        else{
            const list=JSON.parse(localStorage.getItem('list'))
            list.push(Items)
            localStorage.setItem("list",JSON.stringify(list))
        }
        this.setState({
            list:JSON.parse(localStorage.getItem('list'))
        });
    }

    componentDidMount() {
        const list = window.localStorage.getItem('list');
        const parsedList = JSON.parse(list);
        if(list == null){
            return false
        }
        else{
            this.setState({
                list: parsedList,
            })
            console.log(this.state.list);
        }
    }
    
    deleteItem=(event)=> {
        
        let index = event.target.getAttribute('data-key')
        let listValue=JSON.parse(localStorage.getItem('list'));
        listValue.splice(index,1)
        this.setState({list:listValue});
        localStorage.setItem('list',JSON.stringify(listValue))
    }

    
    
    render() {
        return (
            <div className="main-container">
                <h1>Сохранить результат</h1>
                <hr/>
                <div className="container">
                    <input type="text" placeholder="Вставьте результат сюда" ref={this.input}></input>
                        <button onClick={this.addTask} className="button" >Сохранить</button>
                        <br></br>
                        <br></br>
                            <ol>
                                {
                                    this.state.list.map((item,index)=>
                                    {
                                        return(<li key={item.id}> {item.value}
                                        <button className="button" type="button" value="delete" data-key={index} onClick={this.deleteItem}>Удалить</button></li>)
                                    })
                                } 
                            </ol>
                </div>
                
            </div>
        )
    }
}

export {Stats}
