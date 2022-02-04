package entity

import (
	"time"

	"gorm.io/gorm"
)

type Screening struct {
	gorm.Model

	PatientID *uint
	Patient   Patient `gorm:"references:id" valid:"-"`

	DentistassID *uint
	Dentistass   User `gorm:"references:id" valid:"-"`

	MedicalProductID *uint
	MedicalProduct   MedicalProduct `gorm:"references:id" valid:"-"`
	//3 type diff
	Illnesses string `valid:"required~illnesses cannot be blank"`
	Queue     uint
	Date      time.Time
}
