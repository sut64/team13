package entity

import (
	"time"

	"gorm.io/gorm"
)

type Screening struct {
	gorm.Model

	PatientID *uint
	Patient   Patient

	DentistassID *uint
	Dentistass   User

	MedicalProductID *uint
	MedicalProduct   MedicalProduct
	//3 type diff
	Illnesses string
	Queue     uint
	Date      time.Time
}
