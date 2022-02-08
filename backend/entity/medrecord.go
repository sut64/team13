package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type MedRecord struct {
	gorm.Model
	Amount     int       `valid:"med_amount_positive~Amount does not validate as positive"`
	AdviceText string    `valid:"required~Advicetext cannot be blank"`
	Datetime   time.Time `valid:"past~Datetime must be in the past"`

	TreatmentID *uint
	Treatment   Treatment `valid:"-"`

	PharmacistID *uint
	Pharmacist   User `valid:"-"`

	MedicalProductID *uint
	MedicalProduct   MedicalProduct `valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
	govalidator.CustomTypeTagMap.Set("med_amount_positive", func(i interface{}, context interface{}) bool {
		num := i
		return num.(int) > 0
	})
}
