package entity

import (
	"time"

	"gorm.io/gorm"
)

type MedRecord struct {
	gorm.Model
	Amount     uint
	AdviceText string
	Datetime   time.Time

	TreatmentID *uint
	Treatment   Treatment

	PharmacistID *uint
	Pharmacist   User

	MedicalProductID *uint
	MedicalProduct   MedicalProduct
}
