package entity

import (
	// "errors"
	"fmt"
	"strings"
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
	"None":          true,
	"Gold":          true,
	"Silver":        true,
	"Composites":    true,
	"Ceramics":      true,
	"Glass ionomer": true,
}

type TreatmentValidationError struct {
	Code  string
	Value string
}

func (e *TreatmentValidationError) Error() string {
	return fmt.Sprintf("%s:%s", e.Code, e.Value)
}

func (t *Treatment) Validation() (bool, *TreatmentValidationError) {

	if !(t.ToothNumber >= 0 && t.ToothNumber <= 32) {
		return false, &TreatmentValidationError{"E03V3", "tooth number must be in range(0,32)"}
	}

	t.ToothFilling = strings.TrimSpace(t.ToothFilling)
	if t.ToothFilling == "" {
		t.ToothFilling = "None"
	}

	if !tooth_filling[t.ToothFilling] {
		return false, &TreatmentValidationError{"E03V4", fmt.Sprintf("\"%s\" is not an option for tooth filling", t.ToothFilling)}
	}

	{
		current_time := time.Now()
		check_time := current_time.Add(-24 * time.Hour)
		if !(t.Date.After(check_time) && t.Date.Before(current_time)) {
			return false, &TreatmentValidationError{"E03V5", "incorrect date please check"}
		}
	}

	return true, nil
}
