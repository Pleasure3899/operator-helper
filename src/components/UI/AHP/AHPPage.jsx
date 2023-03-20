import React, { useState, useEffect } from 'react'
import axios from "axios";
import AHP from 'ahp';
import toast, { Toaster } from 'react-hot-toast';
import '../../../styles/AHPPage.css'


const AHPPage = () => {

  const errorCritariaInput = () => toast.error("Помилка. Введіть одну цифру від 2 до 6");

  const ahpContext = new AHP();

  const [patrols, setPatrols] = useState([])
  const [outputAHP, setOutputAHP] = useState([])
  const [objects, setObjects] = useState([])

  const calculateClick = () => {
    calculateAHP()
  }

  const calculateAHP = () => {

    for (var i = 0; i < patrols.length; i++) {
      ahpContext.addItem("Патруль " + patrols[i].id);
    }

    var criteriaCount = prompt("Введіть кількість критеріїв (від 2 до 6)");

    var regexp = new RegExp('^[2-6]$');

    if (regexp.test(criteriaCount)) {

      var criteriaArray = new Array(Number(criteriaCount))

      for (i = 1; i <= criteriaCount; i++) {
        var result = prompt("Введіть назву " + i + " критерію");
        criteriaArray[i - 1] = result;
      }

      ahpContext.addCriteria(criteriaArray);

      var criteriasArraySize = 0;
      for (i = 1; i < criteriaArray.length; i++) {
        criteriasArraySize = criteriasArraySize + i;
      }

      var rankCriterias = new Array(criteriasArraySize);
      var iterator = 0;
      for (var j = 0; j < criteriaArray.length; j++) {
        for (var k = j + 1; k < criteriaArray.length; k++) {

          result = prompt("Введіть оцінку критерію '" + criteriaArray[j] + "' до критерію '" + criteriaArray[k] + "'");

          regexp = new RegExp('^[1-9]$');

          if (!regexp.test(result)) {
            if ((regexp.test(result[0])) && (regexp.test(result[2])) && (result[1] === "/") && (result.length === 3)) {
              result = result[0] / result[2]
              rankCriterias[iterator] = [criteriaArray[j], criteriaArray[k], result];
              iterator++;
            } else {
              alert("Введені не корректні дані, спробуйте ще раз. Від 1 до 9 або обернений дріб 1/[1-9]")
              k = k - 1;
            }
          } else {
            rankCriterias[iterator] = [criteriaArray[j], criteriaArray[k], result];
            iterator++;
          }
        }
      }

      ahpContext.rankCriteria(rankCriterias);

      var arraySize = 0;
      for (i = 1; i < patrols.length; i++) {
        arraySize = arraySize + i;
      }

      for (i = 0; i < criteriaArray.length; i++) {

        var rankCriteriaItem = new Array(arraySize);
        iterator = 0;
        for (j = 0; j < patrols.length; j++) {
          for (k = j + 1; k < patrols.length; k++) {

            result = prompt("Введіть оцінку Патруля №" + patrols[j].id + " до Патруля №" + patrols[k].id + " за критерієм " + criteriaArray[i]);

            regexp = new RegExp('^[1-9]$');

            if (!regexp.test(result)) {
              if ((regexp.test(result[0])) && (regexp.test(result[2])) && (result[1] === "/") && (result.length === 3)) {
                result = result[0] / result[2]
                rankCriteriaItem[iterator] = ['Патруль ' + patrols[j].id, 'Патруль ' + patrols[k].id, result];
                iterator++;
              } else {
                alert("Введені не корректні дані, спробуйте ще раз. Від 1 до 9 або обернений дріб 1/[1-9]")
                k = k - 1;
              }
            } else {
              rankCriteriaItem[iterator] = ['Патруль ' + patrols[j].id, 'Патруль ' + patrols[k].id, result];
              iterator++;
            }

          }
        }
        ahpContext.rankCriteriaItem(criteriaArray[i], rankCriteriaItem);
      }

      let output = ahpContext.debug();
      setOutputAHP(output)

    } else {

      errorCritariaInput()

    }

  };

  useEffect(() => {

    const fetchAllPatrols = async () => {
      const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
      const response = await axios.get(BECKEND_URL + "/patrols-name");
      setPatrols(response.data);
      return response.data;
    };

    const fetchAllObjects = async () => {
      const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
      const response = await axios.get(BECKEND_URL + "/objects");
      setObjects(response.data);
      return response.data;
    };

    fetchAllPatrols();
    fetchAllObjects();
  }, []);

  return (
    <div id='mai-page'>
      <Toaster toastOptions={{
        style: {
          background: '#fff6df',
          color: '#233044',
        },
      }} />

      <span id="title-span">Оберіть об'єкт:</span><br></br>
      <select id="select-object">
        {objects.map(object =>
          <option key={object.id} value={object.id}>
            {object.id} - {object.street} {object.house}{object.apartment && ", кв. " + object.apartment}
          </option>
        )}
      </select><br></br>

      <button id="btn-calculate" onClick={calculateClick}>Розрахувати</button>

      {outputAHP.length !== 0 && <pre id="pre-output">{outputAHP.log}</pre>}

    </div>
  );
};

export default AHPPage;