package entity

import "gorm.io/gorm"

type Role struct {
	gorm.Model
	Name  string
	Users []User `gorm:"foreignKey:RoleID"`
}

type User struct {
	gorm.Model
	Firstname string
	Lastname  string
	Username  string `gorm:"uniqueIndex"`
	Password  string

	RoleID *uint
	Role   Role `gorm:"foreignKey:RoleID"`

	Treatments []Treatment `gorm:"foreignKey:DentistID"`
	Payments   []Payment   `gorm:"foreignKey:UserFinancialID"`
	MedRecords []MedRecord `gorm:"foreignKey:PharmacistID"`
}
