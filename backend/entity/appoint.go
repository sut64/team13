package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type RemedyType struct {
	gorm.Model
	Name      string
	Appoints  []Appoint   `gorm:"foreignKey:RemedyTypeID"`
	Treatment []Treatment `gorm:"foreignKey:RemedyTypeID"`
	Payments  []Payment   `gorm:"foreignKey:RemedyTypeID"`
}

type Appoint struct {
	gorm.Model
	AppointTime time.Time
	Room        int
	Todo        string `valid:"required~Todo cannot be blank"`

	DentistID *uint
	Dentist   User

	PatientID *uint
	Patient   Patient

	RemedyTypeID *uint
	RemedyType   RemedyType
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("Now", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Equal(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("positive", func(i interface{}, context interface{}) bool {
		num := i
		return num.(int) >= 0
	})
}
