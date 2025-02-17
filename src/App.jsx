import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(20);
  const [specialcharAllowed, setspecialchar] = useState(false);
  const [numberAllowed, setnumber] = useState(false);
  const [password, setpassword] = useState()
  const selectText = useRef(null)
  const [copyvisibility, setcopyVisibility] = useState(false)
  // password generator function
  let passwordGenerator = useCallback(() => {
    console.log("password generator called")
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (specialcharAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }
    console.log(str.length);
    let pass = "";
    for (let index = 0; index < length; index++) {
      const c = parseInt(Math.random() * str.length)
      console.log(c)
      pass += str[c];
      console.log(pass)
    }


    setpassword(pass)

    console.log(`pass word set to ${pass}`)

  }, [length, specialcharAllowed, numberAllowed]);

  useEffect(()=>{
    passwordGenerator(false)
  }, [length, numberAllowed, specialcharAllowed])

  useEffect(()=>{
    setcopyVisibility()
  }, [length, numberAllowed, specialcharAllowed])

  return (
    <>
      <div className="mt-4 pt-4  heading flex justify-center">
        <p className="text-white text-4xl">Random Password Generator</p>

      </div>
      {/* length */}
      <div className="flex justify-center">
        <p className="text-white p-2 m-2">length</p>
        <input
          type="range"
          name="length"
          min="1"
          max="20"
          onChange={(e) => setlength(e.target.value)}
        />
          {console.log(length)}

        <p className="text-white p-2 m-2">{length}</p>
      </div>
      {/* special characters and numbers */}
      <div className=" m-0 p-0 text-3xl font-bold  flex justify-center text-white">
        <input
          className="m-2 p-2"
          type="checkbox"
          onClick={() =>
            setspecialchar((specialcharAllowed) => !specialcharAllowed)
          }
        />
        {console.log(`special char allowed ${specialcharAllowed}`)}
        <p className="m-2 p-2">special chars</p>

        <input
          className="m-2 p-2"
          type="checkbox"
          onClick={() => setnumber((numberAllowed) => !numberAllowed)}
        />
        {console.log(`numbers allowed ${numberAllowed}`)}
        
        <p className="m-2 p-2">numbers</p>
        
      </div>
      <div className="text-4xl text-black flex justify-center m-22">
        
          <input ref={selectText} className="bg-white text-black
          border-green-500 border-4" type="text" value={password} />
          
          <button className="bg-blue-900 ml-6 p-2 text-white" 
          onClick={()=>{
            navigator.clipboard.writeText(password)
            selectText.current.select()
            setcopyVisibility("visible")
            
          }}
          >copy</button>
          
      </div>
      <div className="flex justify-center">
        <p className={`text-yellow-400 p-2 m-2 text-4xl italic ${copyvisibility? "visible" : "invisible"}`}>copied</p>
      </div>
    </>
  );
}

export default App;
