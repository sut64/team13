package entity

import (
	"time"

	"gorm.io/gorm"
)

type Treatment struct {
	gorm.Model

	PrescriptionRaw  string
	PrescriptionNote string
	ToothNumber      int
	ToothFilling     string
	Date             time.Time

	// Sreening entity

	DentistID *uint
	Dentist   User `gorm:"foreignKey:DentistID"`

	// Remedy Type entity

}
