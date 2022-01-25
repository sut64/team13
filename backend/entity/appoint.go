package entity

import (
	"time"

	"gorm.io/gorm"
)

type RemedyType struct {
	gorm.Model
	Name      string
	Appoints  []Appoint   `gorm:"foreignKey:RemedyTypeID"`
	Treatment []Treatment `gorm:"foreignKey:RemedyTypeID"`
	Payments  []Payment   `gorm:"foreignKey:RemedyTypeID"`
}

type Appoint struct {
	gorm.Model
	AppointTime time.Time
	Room        int
	Todo        string

	DentistID *uint
	Dentist   User

	PatientID *uint
	Patient   Patient

	RemedyTypeID *uint
	RemedyType   RemedyType
}
