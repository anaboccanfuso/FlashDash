# Generated by Django 3.2.16 on 2023-03-08 03:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0020_alter_set_description_alter_set_identifier_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school', models.CharField(blank=True, choices=[('HARVARD UNIVERSITY', 'Harvard University'), ('PRINCETON UNIVERSITY', 'Princeton University'), ('YALE UNIVERSITY', 'Yale University'), ('COLUMBIA UNIVERSITY', 'Columbia University'), ('STANFORD UNIVERSITY', 'Stanford University'), ('UNIVERSITY OF CHICAGO', 'University of Chicago'), ('DUKE UNIVERSITY', 'Duke University'), ('UNIVERSITY OF PENNSYLVANIA', 'University of Pennsylvania'), ('CALIFORNIA INSTITUTE OF TECHNOLOGY', 'California Institute of Technology'), ('MASSACHUSETTS INSTITUTE OF TECHNOLOGY', 'Massachusetts Institute of Technology'), ('CORNELL UNIVERSITY', 'Cornell University'), ('BROWN UNIVERSITY', 'Brown University'), ('RICE UNIVERSITY', 'Rice University'), ('DARTMOUTH COLLEGE', 'Dartmouth College'), ('UNIVERSITY OF NOTRE DAME', 'University of Notre Dame'), ('EMORY UNIVERSITY', 'Emory University'), ('VANDERBILT UNIVERSITY', 'Vanderbilt University'), ('UNIVERSITY OF CALIFORNIA-BERKELEY', 'University of California-Berkeley'), ('UNIVERSITY OF VIRGINIA', 'University of Virginia'), ('UNIVERSITY OF NORTH CAROLINA-CHAPEL HILL', 'University of North Carolina-Chapel Hill'), ('GEORGETOWN UNIVERSITY', 'Georgetown University'), ('UNIVERSITY OF MICHIGAN-ANN ARBOR', 'University of Michigan-Ann Arbor'), ('UNIVERSITY OF CALIFORNIA-LOS ANGELES', 'University of California-Los Angeles'), ('UNIVERSITY OF TEXAS-AUSTIN', 'University of Texas-Austin'), ('UNIVERSITY OF FLORIDA', 'University of Florida'), ('UNIVERSITY OF GEORGIA', 'University of Georgia'), ('UNIVERSITY OF ILLINOIS-URBANA-CHAMPAIGN', 'University of Illinois-Urbana-Champaign'), ('UNIVERSITY OF WASHINGTON', 'University of Washington'), ('UNIVERSITY OF OREGON', 'University of Oregon'), ('UNIVERSITY OF MINNESOTA-TWIN CITIES', 'University of Minnesota-Twin Cities'), ('UNIVERSITY OF PITTBURGH', 'University of Pittsburgh'), ('UNIVERSITY OF ARIZONA', 'University of Arizona'), ('UNIVERSITY OF ARKANSAS', 'University of Arkansas'), ('UNIVERSITY OF KANSAS', 'University of Kansas'), ('UNIVERSITY OF OKLAHOMA', 'University of Oklahoma'), ('UNIVERSITY OF UTAH', 'University of Utah'), ('UNIVERSITY OF ALABAMA', 'University of Alabama'), ('UNIVERSITY OF ALASKA', 'University of Alaska'), ('UNIVERSITY OF IDAHO', 'University of Idaho'), ('UNIVERSITY OF IOWA', 'University of Iowa'), ('UNIVERSITY OF KENTUCKY', 'University of Kentucky'), ('UNIVERSITY OF LOUISIANA', 'University of Louisiana'), ('UNIVERSITY OF MAINE', 'University of Maine'), ('UNIVERSITY OF MARYLAND', 'University of Maryland'), ('UNIVERSITY OF MASSACHUSETTS', 'University of Massachusetts'), ('UNIVERSITY OF MICHIGAN', 'University of Michigan'), ('UNIVERSITY OF MISSOURI', 'University of Missouri'), ('UNIVERSITY OF MONTANA', 'University of Montana'), ('UNIVERSITY OF NEBRASKA', 'University of Nebraska'), ('UNIVERSITY OF NEW HAMPSHIRE', 'University of New Hampshire'), ('UNIVERSITY OF NEW JERSEY', 'University of New Jersey'), ('UNIVERSITY OF NEW MEXICO', 'University of New Mexico'), ('UNIVERSITY OF NORTH DAKOTA', 'University of North Dakota'), ('UNIVERSITY OF OHIO', 'University of Ohio'), ('UNIVERSITY OF OKLAHOMA', 'University of Oklahoma'), ('UNIVERSITY OF PENNSYLVANIA', 'University of Pennsylvania'), ('UNIVERSITY OF RHODE ISLAND', 'University of Rhode Island'), ('UNIVERSITY OF SOUTH CAROLINA', 'University of South Carolina'), ('UNIVERSITY OF SOUTH DAKOTA', 'University of South Dakota'), ('UNIVERSITY OF TENNESSEE', 'University of Tennessee'), ('UNIVERSITY OF TEXAS', 'University of Texas'), ('UNIVERSITY OF VERMONT', 'University of Vermont'), ('UNIVERSITY OF VIRGINIA', 'University of Virginia'), ('UNIVERSITY OF WASHINGTON', 'University of Washington'), ('UNIVERSITY OF WEST VIRGINIA', 'University of West Virginia'), ('UNIVERSITY OF WISCONSIN', 'University of Wisconsin'), ('UNIVERSITY OF WYOMING', 'University of Wyoming'), ('VILLANOVA UNIVERSITY', 'Villanova University'), ('VIRGINIA TECH', 'Virginia Tech'), ('WAKE FOREST UNIVERSITY', 'Wake Forest University'), ('WASHINGTON STATE UNIVERSITY', 'Washington State University'), ('WASHINGTON UNIVERSITY IN ST. LOUIS', 'Washington University in St. Louis'), ('WAYNE STATE UNIVERSITY', 'Wayne State University'), ('WEBER STATE UNIVERSITY', 'Weber State University'), ('WELLESLEY COLLEGE', 'Wellesley College'), ('WEST VIRGINIA UNIVERSITY', 'West Virginia University'), ('WESTERN MICHIGAN UNIVERSITY', 'Western Michigan University'), ('WESTERN WASHINGTON UNIVERSITY', 'Western Washington University'), ('WESTFIELD STATE UNIVERSITY', 'Westfield State University'), ('WHEATON COLLEGE', 'Wheaton College'), ('WHEELING JESUIT UNIVERSITY', 'Wheeling Jesuit University'), ('WHITMAN COLLEGE', 'Whitman College'), ('WHITTIER COLLEGE', 'Whittier College'), ('WICHITA STATE UNIVERSITY', 'Wichita State University'), ('WIDENER UNIVERSITY', 'Widener University'), ('WILLIAM JEWELL COLLEGE', 'William Jewell College'), ('WILLIAM PATERSON UNIVERSITY', 'William Paterson University'), ('WILLIAMS COLLEGE', 'Williams College'), ('WINTHROP UNIVERSITY', 'Winthrop University'), ('WOFFORD COLLEGE', 'Wofford College'), ('WRIGHT STATE UNIVERSITY', 'Wright State University'), ('XAVIER UNIVERSITY', 'Xavier University'), ('YALE UNIVERSITY', 'Yale University'), ('YESHIVA UNIVERSITY', 'Yeshiva University'), ('YOUNGSTOWN STATE UNIVERSITY', 'Youngstown State University'), ('ZANE STATE COLLEGE', 'Zane State College'), ('ZAPATA COLLEGE', 'Zapata College'), ('ZAYANTE SANDHILLS LABORATORY', 'Zayante Sandhills Laboratory'), ('ZIMMERMANN COLLEGE', 'Zimmermann College'), ('ZION BIBLE COLLEGE', 'Zion Bible College')], default='', max_length=50)),
                ('recently_viewed', models.JSONField(default={'recently_viewed': []})),
                ('quiz_performance', models.JSONField(default={})),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
