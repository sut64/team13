package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

const password_cost = 14

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("SE-G13_dental_system.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Role{},
		&User{},
		&Treatment{},
		&Payment{},
	)

	db = database

	// ทดสอบเบื้องต้น
	// add new role
	dentist := addRole("Dentist")
	pharmacist := addRole("Pharmacist")

	// add new user
	mydentist := addUser(
		User{
			Firstname: "ฟันดี", Lastname: "ฟันน้ำนม",
			Username: "yesimadoctor", Password: "1234",
		}, dentist)

	addUser(
		User{
			Firstname: "ฟันทน", Lastname: "คงนาน",
			Username: "notdoc", Password: "secret",
		}, pharmacist)

	// test for treatment with user entity
	treatment := Treatment{ToothNumber: 1, Dentist: mydentist}
	db.Create(&treatment)
}

func addRole(name string) Role {
	role := Role{Name: name}
	db.Create(&role)
	return role
}

func addUser(user User, role Role) User {
	user.Role = role
	user.Password = hashPassword(user.Password)
	db.Create(&user)
	return user
}

func hashPassword(password string) string {
	result, _ := bcrypt.GenerateFromPassword([]byte(password), password_cost)
	return string(result)
}
