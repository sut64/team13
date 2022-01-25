package entity

import (
	"time"

	"gorm.io/gorm"
)

type Screening struct {
	gorm.Model

	PatientID *uint
	Patient   Patient

	UserDentistassID *uint
	UserDentistass   User

	MedicalProductID *uint
	MedicalProduct   MedicalProduct

	Illnesses string
	Queue     *uint
	Date      time.Time
}
