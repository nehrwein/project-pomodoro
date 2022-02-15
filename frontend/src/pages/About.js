import React from 'react';
import { PagesContainer, CardContainer, Card, Image, Link } from "styled-components/Styling"
import img_Darya from '../images/darya.jpeg'
import img_Birgit from "../images/birgit.jpeg"
import img_Rebecca from "../images/rebecca.jpeg"

const About = () => {

  const aboutUsArray = [
    {
      id: 1,
      name: "Birgit",
      description: "Hi, I am Birgit, a passionate frontend developer with lots of experience managing IT-projects on the client side. I love solving puzzles of every kind. If it's a Javascript one even better - I can't get enough of it!", 
      link: "https://github.com/nehrwein",
      img: img_Birgit
    },
    {
      id: 2,
      name: "Darya",
      description: "Hi! I’m Darya 👋 , a front-end developer. My journey into Web development started when I first discovered HTML and CSS. After I built my first website I was hooked by coding. I enjoy building projects and solving coding problems.", 
      link: "https://github.com/DALA746",
      img: img_Darya
    },
    {
      id: 3,
      name: "Rebecca",
      description: "My name is Rebecca and I'm a frontend developer with a special interest in React. I'm also curious about App Development. I have a background in education and currently I'm working as a upper secondary school teacher in Spanish and Swedish as a Second Language.", 
      link: "https://github.com/Rephili", 
      img: img_Rebecca
    }
  ]

  return (
    <PagesContainer>
      <h2>About us</h2>
      <p>Hi, we are Birgit, Darya and Rebecca and together we are building a PomodoroTimer as our final project of the Technigo Bootcamp.</p>
      <CardContainer>
        {aboutUsArray.map((item) => (
          <Card key={item.id}>
            <h1>{item.name}</h1>
            <Image src={item.img}  alt="img"/>
            <p>{item.description}</p>
            <Link href={item.link} target="_blank" rel="noopener noreferrer">Github</Link>
          </Card>
        ))}
      </CardContainer>
    </PagesContainer>
  );
};

export default About;
