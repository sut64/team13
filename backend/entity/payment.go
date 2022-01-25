package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model

	Price     float32
	Pricetext string
	Paytime   time.Time
	Note      string

	PatientID *uint
	Patient   Patient

	FinancialID *uint
	Financial   User

	// remedytype entity
	RemedyTypeID *uint
	RemedyType   RemedyType
}
