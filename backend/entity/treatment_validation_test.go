package entity

import (
	"fmt"
	"testing"
	"time"

	. "github.com/onsi/gomega"
)

func TestTreatmentPass(t *testing.T) {
	g := NewGomegaWithT(t)

	data := []Treatment{
		{
			PrescriptionRaw:  "", // allow empty
			PrescriptionNote: "", // allow empty
			ToothNumber:      0,
			ToothFilling:     "Ceramics",
			Date:             time.Now(),
		},
		{
			PrescriptionRaw:  "Para",
			PrescriptionNote: "one every 4 hours",
			ToothNumber:      12,
			ToothFilling:     "Gold",
			Date:             time.Now().Add(-1 * time.Hour),
		},
		{
			PrescriptionRaw:  "Para",
			PrescriptionNote: "",
			ToothNumber:      21,
			ToothFilling:     "", // this also allow empty
			Date:             time.Now().Add(-23 * time.Hour),
		},
		{
			PrescriptionRaw:  "",
			PrescriptionNote: "",
			ToothNumber:      32,
			ToothFilling:     "   ", // white space is also allow
			Date:             time.Now().Add(-23 * time.Hour),
		},
		{
			PrescriptionRaw:  "",
			PrescriptionNote: "",
			ToothNumber:      1,
			ToothFilling:     "None", // or use None
			Date:             time.Now().Add(-23 * time.Hour),
		},
	}

	for _, v := range data {
		OK, err := v.Validation()
		g.Expect(OK).To(BeTrue())
		g.Expect(err).To(BeNil())
	}
}

func TestTreatmentToothNumberNotInRange(t *testing.T) {
	g := NewGomegaWithT(t)

	data := []Treatment{
		{
			PrescriptionRaw:  "",
			PrescriptionNote: "",
			ToothNumber:      -3, // less than 0
			ToothFilling:     "Ceramics",
			Date:             time.Now(),
		},
		{
			PrescriptionRaw:  "Para",
			PrescriptionNote: "one every 4 hours",
			ToothNumber:      33, // more than 32
			ToothFilling:     "Gold",
			Date:             time.Now().Add(-1 * time.Hour),
		},
	}

	for _, v := range data {
		OK, err := v.Validation()
		g.Expect(OK).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("tooth number must be in range(0,32)"))
	}
}

func TestTreatmentToothFillingNotAnOption(t *testing.T) {
	g := NewGomegaWithT(t)

	data := []Treatment{
		{
			PrescriptionRaw:  "",
			PrescriptionNote: "",
			ToothNumber:      0,
			ToothFilling:     "Diamon", // we dont have this material
			Date:             time.Now(),
		},
		{
			PrescriptionRaw:  "Para",
			PrescriptionNote: "one every 4 hours",
			ToothNumber:      11,
			ToothFilling:     "%@=-=-", // random string yes it is not valid
			Date:             time.Now().Add(-1 * time.Hour),
		},
	}

	for _, v := range data {
		OK, err := v.Validation()
		g.Expect(OK).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("\"%s\" is not an option for tooth filling", v.ToothFilling)))
	}
}

func TestTreatmentDateNotValid(t *testing.T) {
	g := NewGomegaWithT(t)

	data := []Treatment{
		{
			PrescriptionRaw:  "",
			PrescriptionNote: "",
			ToothNumber:      0,
			ToothFilling:     "None",
			Date:             time.Now().Add(10 * time.Minute), // future
		},
		{
			PrescriptionRaw:  "Para",
			PrescriptionNote: "one every 4 hours",
			ToothNumber:      11,
			ToothFilling:     "None",
			Date:             time.Now().Add(-24 * time.Hour), // past : more than 24 hour
		},
	}

	for _, v := range data {
		OK, err := v.Validation()
		g.Expect(OK).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("incorrect date please check"))
	}
}
