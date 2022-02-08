package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model

	Price     float32   `valid:"positive~Price cannot be negative"`
	Pricetext string    `valid:"required~Pricetext cannot be blank"`
	Paytime   time.Time `valid:"past~Pay time must be a past date"`

	Note string `gorm:"references:id" valid:"-"`

	PatientID *uint
	Patient   Patient `gorm:"references:id" valid:"-"`

	FinancialID *uint
	Financial   User `gorm:"references:id" valid:"-"`

	// remedytype entity
	RemedyTypeID *uint
	RemedyType   RemedyType `gorm:"references:id" valid:"-"`
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
	govalidator.CustomTypeTagMap.Set("positive", func(i interface{}, context interface{}) bool {
		num := i
		return num.(float32) >= 0
	})

}
