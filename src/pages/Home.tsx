"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/card";
import Table from "@/components/ui/Table";
import Input from "@/components/ui/Input";

export default function Home() {
  const [message, setMessage] = useState("");

  const handlePrimaryClick = () => {
    setMessage("Primary button was clicked!");
  };

  const handleSecondaryClick = () => {
    setMessage("Secondary button was clicked!");
  };

  const handleDangerClick = () => {
    setMessage("Delete button was clicked!");
  };

  const users = [
    {
      name: "John Doe",
      age: 25,
      city: "Cairo",
    },
    {
      name: "Sarah Ahmed",
      age: 28,
      city: "Alexandria",
    },
    {
      name: "Mohamed Ali",
      age: 30,
      city: "Giza",
    },
    {
      name: "Emma Smith",
      age: 24,
      city: "Luxor",
    },
  ];

  return (
    <main className="container">
      {/* HERO */}

      <section className="hero">
        <h1>Reusable Components</h1>

        <p>
          Next.js + TypeScript reusable components demonstration.
        </p>
      </section>

      {/* BUTTONS */}

      <section className="section">
        <h2>Reusable Buttons</h2>

        <div className="button-group">
          <Button
            text="Primary Button"
            onClick={handlePrimaryClick}
            variant="primary"
          />

          <Button
            text="Secondary Button"
            onClick={handleSecondaryClick}
            variant="secondary"
          />

          <Button
            text="Delete"
            onClick={handleDangerClick}
            variant="danger"
          />

          <Button
            text="Disabled Button"
            onClick={() => setMessage("This should not happen")}
            variant="primary"
            disabled
          />
        </div>

        {/* CLICK MESSAGE */}

        {message && (
          <div className="click-message">
            {message}
          </div>
        )}
      </section>

      {/* CARDS */}

      <section className="section">
        <h2>Reusable Cards</h2>

        <div className="card-grid">
          <Card
            title="First Card"
            description="This is the first reusable card."
          />

          <Card
            title="Second Card"
            description="This card uses different data."
          >
            <Button
              text="Learn More"
              onClick={() =>
                setMessage("Learn More button was clicked!")
              }
              variant="secondary"
            />
          </Card>
        </div>
      </section>

      {/* INPUT */}

      <section className="section">
        <h2>Reusable Input</h2>

        <Input placeholder="Enter your name..." />
      </section>

      {/* TABLE */}

      <section className="section">
        <h2>Users Table</h2>

        <Table
          columns={["Name", "Age", "City"]}
          data={users}
          striped
        />
      </section>
    </main>
  );
}