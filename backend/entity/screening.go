package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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
	Illnesses string    `valid:"required~illnesses cannot be blank"`
	Queue     int       `gorm:"uniqueIndex" valid:"screening_positive~Queue must not be negative, required~Queue must not be zero or empty"`
	Date      time.Time `valid:"past~Screening time not be a future"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.After(t)
	})
	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.Before(time.Time(t))
	})
	govalidator.CustomTypeTagMap.Set("screening_positive", func(i interface{}, context interface{}) bool {
		num := i
		return num.(int) > 0
	})
}
