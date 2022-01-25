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

	Patients   []Patient   `gorm:"foreignKey:NurseID"`
	Treatments []Treatment `gorm:"foreignKey:DentistID"`
	MedRecords []MedRecord `gorm:"foreignKey:PharmacistID"`
	Appoints   []Appoint   `gorm:"foreignKey:DentistID"`
	Payments   []Payment   `gorm:"foreignKey:FinancialID"`
	Screenings []Screening `gorm:"foreignKey:DentistassID"`
}
