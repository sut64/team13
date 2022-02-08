package entity

import (
	"errors"
	"fmt"
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
	ScreeningID *uint
	Screening   Screening

	DentistID *uint
	Dentist   User `gorm:"foreignKey:DentistID"`

	// Remedy Type entity
	RemedyTypeID *uint
	RemedyType   RemedyType

	MedRecords []MedRecord `gorm:"foreignKey:TreatmentID"`
}

var tooth_filling = map[string]bool{
	"Gold":          true,
	"Silver":        true,
	"Composites":    true,
	"Ceramics":      true,
	"Glass ionomer": true,
	"None":          true,
}

func (t *Treatment) Validation() (bool, error) {

	fmt.Printf("tooth number :%d\n", t.ToothNumber)
	if !(t.ToothNumber >= 0 && t.ToothNumber <= 32) {
		return false, errors.New("tooth number must be in range(0,32)")
	}

	if t.ToothFilling == "" {
		t.ToothFilling = "None"
	}

	if !tooth_filling[t.ToothFilling] {
		return false, errors.New(fmt.Sprintf("\"%s\" is not an option for tooth filling", t.ToothFilling))
	}

	{
		current_time := time.Now()
		check_time := current_time.Add(-24 * time.Hour)
		if !(t.Date.After(check_time) && t.Date.Before(current_time)) {
			return false, errors.New("in correct date please check")
		}
	}

	return true, nil
}
