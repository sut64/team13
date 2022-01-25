package entity

import (
	"gorm.io/gorm"
)

type MedicalProduct struct {
	gorm.Model
	Name       string
	MedRecords []MedRecord `gorm:"foreignKey:MedicalProductID"`
	Screenings []Screening `gorm:"foreignKey:MedicalProductID"`
}
