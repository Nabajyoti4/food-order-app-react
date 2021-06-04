import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";

//compoent
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-order-react-app-default-rtdb.firebaseio.com/meals.json"
        );

        const data = await response.json();

        console.log(data);

        const loadMeals = [];

        for (const key in data) {
          loadMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
          setMeals(loadMeals);
        }
      } catch (err) {
        setHttpError(err.message);
      }

      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.meals__loading}>
        <p>Loading Meals ...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.meals__error}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      ></MealItem>
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
